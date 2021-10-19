const { AuthenticationError } = require('apollo-server-express');
const { Area, Boulder } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        areas: async () => {
            return Area.find().populate('areas');
          },
        boulders: async () => {
            return Boulder.find().populate('boulders');
          },
        },
    Mutation:{
        addArea: async (parent, {areaName, areaDescription, parkingDescription, approachDescription}) => {
            const area = await Area.create({areaName, areaDescription,parkingDescription,approachDescription});
        },
        addBoulder: async(parent, {boulderName, boulderDescription}) => {
            const boulder = await Boulder.create({boulderName, boulderDescription})
        }
      },
    }

module.exports = resolvers;