import { gql } from 'apollo-server-express'

export default gql`
  type PostUpdatedHistory {
    id:ID!
    title: String!
    description: String!
    image:[String]
    post: ID
    user: ID
    createdAt: String
    updatedAt: String
  }
  type PostUpdatedHistoryPayload {
    id:ID!
    title: String!
    description: String!
    image:[String]
    post: PostPayload
    user: UserPayload
    createdAt: String
    updatedAt: String
  }
  input CreateUpdatedHistoryInput{
    userId: ID!
    postId: ID!
    image: [String]
    title: String!
    description: String!
  }
  extend type Query {
    postupdatedhistorys( postId:ID!): [PostUpdatedHistoryPayload] @auth
  }
  extend type Mutation {
    createPostUpdatedHistory(input: CreateUpdatedHistoryInput!): PostUpdatedHistory @auth
  }
`
