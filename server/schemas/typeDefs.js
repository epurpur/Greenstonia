const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Area {
        _id: ID
        areaName: String
        areaDescription: String
        parkingDescription: String
        approachDescription: String
    }

    type Boulder {
      _id: ID
      boulderName: String
      boulderDescription: String
    }

    type Route {
      _id: ID
      routeName: String
      routeDescription: String
      firstAscent: String
      routeGrade: String
      routeQuality: Int
    }

    # type Auth {
    #     token: ID!
    #     user: User
    #   }

    type Query {
      areas: [Area]
      boulders: [Boulder]
      routes: [Route]
    }

    type Mutation{
      addArea(areaName: String!, areaDescription: String!, parkingDescription: String!, approachDescription: String!): Area
      addBoulder(boulderName: String!, boulderDescription: String!): Boulder
      addRoute(routeName: String!, routeDescription: String!, firstAscent: String, routeGrade: String!, routeQuality: Int!): Route
    } 
`;

module.exports = typeDefs;