const { AuthenticationError } = require('apollo-server-express');
const { Area, Boulder, Route } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        areas: async () => {
            return await Area.find().populate('boulders');
          },
        boulders: async () => {
            return await Boulder.find().populate('routes');
          },
        routes: async () => {
            return await Route.find({});
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