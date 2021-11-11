const { AuthenticationError } = require('apollo-server-express');
const { Area, Boulder, Route, } = require('../models');
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
            return await Route.find();
          },
        // users: async () => {
        //     return User.find();
        //   },
        },
    Mutation:{
        addArea: async (parent, { areaName, areaDescription, parkingDescription, approachDescription }) => {
            return await Area.create({ areaName, areaDescription, parkingDescription, approachDescription });
        },
        addBoulder: async (parent, { boulderName, boulderDescription, areaID }) => {
            const boulder = await Boulder.create({ boulderName, boulderDescription, areaID });

            await Area.findOneAndUpdate(
              { _id: areaID },
              { $addToSet: { boulders: boulder._id }}
            );

            return boulder;
        },
        addRoute: async (parent, {routeName, routeDescription, firstAscent, routeGrade, routeQuality, boulderID}) => {
            const route = await Route.create({ routeName, routeDescription, firstAscent, routeGrade, routeQuality, boulderID });

            await Boulder.findOneAndUpdate(
              { _id: boulderID },
              { $addToSet: { routes: route._id }}
            )

            return route;
        }
      },
    }

module.exports = resolvers;