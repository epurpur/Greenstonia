const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Area {
      _id: ID!
      areaName: String!
      areaDescription: String!
      parkingDescription: String!
      approachDescription: String!
      latitude: String
      longitude: String
      boulders: [Boulder]
    }

    type Boulder {
      _id: ID!
      boulderName: String!
      boulderDescription: String!
      areaID: Area!
      latitude: String
      longitude: String
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

    type User {
      _id: ID!
      username: String!
      password: String!
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
      areas: [Area!]
      boulders: [Boulder!]
      bouldersByArea(areaName: String!): Area 
      routes: [Route!]
      routesByBoulder(boulderID: ID!): Boulder
      users: [User]
    }

    type Mutation{
      login(username: String!, password: String!): Auth
      addArea(areaName: String!, areaDescription: String!, parkingDescription: String!, approachDescription: String!, latitude: String, longitude: String): Area
      addBoulder(boulderName: String!, boulderDescription: String!, areaID: String!): Boulder
      addRoute(routeName: String!, routeDescription: String!, firstAscent: String, routeGrade: String!, routeQuality: Int, boulderID: String!): Route
      addUser(username: String!, password: String!): Auth
    } 
`;

module.exports = typeDefs;