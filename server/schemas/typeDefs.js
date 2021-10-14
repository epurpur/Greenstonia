const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password:String
        phoneNumber: String 
        licenseNumber:String
        roleId:String
        description:String
        jobs:[Job]
     
    }
    
     type Job{
         _id:ID
         jobText:String
         jobAuthor:String
         createdAt:String
         location:String
         duration:String
         otherComments:String
         comments:[Comment]

     }

     type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
      }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
      users: [User]
      user(username: String!): User
      userById(_id: ID!): User
      jobs(username: String): [Job]
      job(jobId: ID!): Job
      jobAuthor(jobAuthor: String!): [Job]
    }

    type Mutation{
    addUser(username: String!, email: String!, password: String!,phoneNumber:String!,licenseNumber:String,roleId:String!,description:String!): Auth
    login(email: String!, password: String!): Auth
    addJob(jobText: String!, jobAuthor: String!, location: String!, duration: String!, otherComments: String!): Job
    addComment(jobId: ID!, commentText: String!, commentAuthor: String!): Job
    removeJob(jobId: ID!): Job
    removeComment(jobId: ID!, commentId: ID!): Job
  } 
`;

module.exports = typeDefs;