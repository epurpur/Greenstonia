const { AuthenticationError } = require('apollo-server-express');
const { Area, Boulder, Route } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        areas: async () => {
            return await Area.find().populate('boulders');
          },
        boulders: async () => {
            return await Boulder.find();
          },
        },
    Mutation:{
        addArea: async (parent, {areaName, areaDescription, parkingDescription, approachDescription}) => {
            return await Area.create({areaName, areaDescription, parkingDescription, approachDescription});
        },
        addBoulder: async (parent, {boulderName, boulderDescription, area}) => {
            return await Boulder.create({boulderName, boulderDescription, area})
        },
      },
    }

module.exports = resolvers;