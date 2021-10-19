const { AuthenticationError } = require('apollo-server-express');
const { Area } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        areas: async () => {
            return Area.find().populate('areas');
          },
        },
    Mutation:{
        addArea: async (parent, {areaName, areaDescription, parkingDescription, approachDescription}) => {
            const area = await Area.create({areaName, areaDescription,parkingDescription,approachDescription});
        },
      },
    }

module.exports = resolvers;