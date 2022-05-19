import { gql } from 'apollo-server-express'

export default gql`
  type Follow {
    id:ID!
    author:ID
    follower:ID
  }

  type FollowPayload {
    id: ID
    author: UserPayload
    follower:UserPayload
  }
  
  input CreateFollowInput{
    authorId: ID!
  }

  type Mutation{
    createFollow(input: CreateFollowInput!): Follow @auth
  }
`
