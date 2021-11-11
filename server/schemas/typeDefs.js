const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Area {
      _id: ID!
      areaName: String!
      areaDescription: String!
      parkingDescription: String!
      approachDescription: String!
      boulders: [Boulder]
    }

    type Boulder {
      _id: ID!
      boulderName: String!
      boulderDescription: String!
      areaID: Area!
      routes: [Route]
    }

    type Route {
      _id: ID!
      routeName: String!
      routeDescription: String!
      firstAscent: String
      routeGrade: String!
      routeQuality: Int
      boulderID: Boulder!
    }

    # type Auth {
    #     token: ID!
    #     user: User
    #   }

    type Query {
      areas: [Area!]
      boulders: [Boulder!]
      routes: [Route!]
    }

    type Mutation{
      addArea(areaName: String!, areaDescription: String!, parkingDescription: String!, approachDescription: String!): Area
      addBoulder(boulderName: String!, boulderDescription: String!, areaID: String!): Boulder
      addRoute(routeName: String!, routeDescription: String!, firstAscent: String, routeGrade: String!, routeQuality: Int, boulderID: String!): Route
    } 
`;

module.exports = typeDefs;