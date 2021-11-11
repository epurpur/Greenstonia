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
      areas: [Area!]
      boulders: [Boulder!]
    }

    type Mutation{
      addArea(areaName: String!, areaDescription: String!, parkingDescription: String!, approachDescription: String!): Area
      addBoulder(boulderName: String!, boulderDescription: String!, areaID: String!): Boulder
    } 
`;

module.exports = typeDefs;