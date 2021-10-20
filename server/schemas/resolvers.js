const { AuthenticationError } = require('apollo-server-express');
const { Area, Boulder, Route } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        areas: async () => {
            return Area.find().populate('areas');
          },
        boulders: async () => {
            return Boulder.find().populate('boulders');
          },
        routes: async () => {
            return Route.find().populate('routes');
          }
        },
    Mutation:{
        addArea: async (parent, {areaName, areaDescription, parkingDescription, approachDescription}) => {
            const area = await Area.create({areaName, areaDescription,parkingDescription,approachDescription});
        },
        addBoulder: async (parent, {boulderName, boulderDescription}) => {
            const boulder = await Boulder.create({boulderName, boulderDescription})
        },
        addRoute: async (parent, {routeName, routeDescription, firstAscent, routeGrade, routeQuality}) => {
          const route = await Route.create({routeName, routeDescription, firstAscent, routeGrade, routeQuality})
        },
      },
    }

module.exports = resolvers;