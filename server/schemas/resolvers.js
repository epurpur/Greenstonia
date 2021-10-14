const { AuthenticationError } = require('apollo-server-express');
const { User,Job} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('jobs');
          },
          user: async (parent, { username }) => {
            return User.findOne({ username }).populate('jobs');
          },
          userById: async (parent, { _id }) => {
            return User.findOne({ _id });
          },
          jobs: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Job.find(params).sort({ createdAt: -1 });
          },
          job: async (parent, { jobId }) => {
            return Job.findOne({ _id: jobId });
          },
          jobAuthor: async (parent, { jobAuthor }) => {
            return Job.find({ jobAuthor: jobAuthor });
          }
        },
    Mutation:{
        addUser: async (parent, { username, email, password, phoneNumber, licenseNumber, roleId, description }) => {
            const user = await User.create({ username, email, password, phoneNumber, licenseNumber, roleId, description });
            const token = signToken(user);
            return { token, user };
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          addJob: async (parent, { jobText, jobAuthor, location, duration, otherComments }) => {
            const job = await Job.create({ jobText, jobAuthor, location, duration, otherComments });
      
            await User.findOneAndUpdate(
              { username: jobAuthor },
              { $addToSet: { jobs: job._id } }
            );
      
            return job;
          },
          addComment: async (parent, { jobId, commentText, commentAuthor }) => {
            return Job.findOneAndUpdate(
              { _id: jobId },
              {
                $addToSet: { comments: { commentText, commentAuthor } },
              },
              {
                new: true,
                runValidators: true,
              }
            );
          },
          removeJob: async (parent, { jobId }) => {
            return Job.findOneAndDelete({ _id: jobId });
          },
          removeComment: async (parent, { jobId, commentId }) => {
            return Job.findOneAndUpdate(
              { _id: jobId },
              { $pull: { comments: { _id: commentId } } },
              { new: true }
            );
          },
        },
    }

module.exports = resolvers;