const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        areaName:String
        areaDescription:String
        parkingDescription:String
        approachDescription:String
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
      areas: [Area]
    }

    type Mutation{
      addArea(areaName: String!, areaDescription: String!, parkingDescription: String!, approachDescription: String!): Area
    } 
`;

module.exports = typeDefs;