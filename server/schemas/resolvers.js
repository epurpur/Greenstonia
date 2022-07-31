const { AuthenticationError } = require('apollo-server-express');
const { Area, Boulder, Route, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        areas: async () => {
            return await Area.find().populate('boulders');
          },
        boulders: async () => {
            return await Boulder.find().populate('routes');
          },
        bouldersByArea: async (parent, { areaName }) => {
          return await Area.findOne({areaName}).populate('boulders');
        },
        routes: async () => {
            return await Route.find();
        },
        routesByBoulder: async (parent, { boulderID }) => {
          return await Boulder.findOne({ _id: boulderID }).populate('routes');
        },
        users: async () => {
            return User.find();
          },
        },
    Mutation:{
        login: async (parent, { username, password }) => {
            // only one username and password exists
            // username: admin
            // password: greenstonia
            const user = await User.findOne({ username });
    
            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password for this username');
            }
    
            const token = signToken(user);
    
            return { token, user };
        },
        addArea: async (parent, { areaName, areaDescription, parkingDescription, approachDescription, latitude, longitude }) => {
            return await Area.create({ areaName, areaDescription, parkingDescription, approachDescription, latitude, longitude });
        },
        addBoulder: async (parent, { boulderName, boulderDescription, areaID, latitude, longitude, boulderImgURL }) => {
            const boulder = await Boulder.create({ boulderName, boulderDescription, areaID, latitude, longitude, boulderImgURL });

            await Area.findOneAndUpdate(
              { _id: areaID },
              { $addToSet: { boulders: boulder._id }}
            );

            return boulder;
        },
        addRoute: async (parent, {routeName, routeDescription, firstAscent, routeGrade, routeQuality, routeImgUrl, routeYoutubeEmbedURL, boulderID}) => {
            const route = await Route.create({ routeName, routeDescription, firstAscent, routeGrade, routeQuality, routeImgUrl, routeYoutubeEmbedURL, boulderID });

            await Boulder.findOneAndUpdate(
              { _id: boulderID },
              { $addToSet: { routes: route._id }}
            )

            return route;
        },
        addUser: async (parent, { username, password }) => {
            const user = await User.create({ username, password });
            const token = signToken(user);
            return { token, user };
        },     
      },
    }

module.exports = resolvers;
