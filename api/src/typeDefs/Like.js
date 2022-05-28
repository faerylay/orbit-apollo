import { gql } from 'apollo-server-express'

export default gql`
  type Like {
    id: ID!
    post: ID
    user: ID
  }
  type LikePayload {
    id: ID!
    post: PostPayload
    user: UserPayload
  }
  input CreateLikeInput {
    postId: ID!
  }
  extend type Mutation {
    createLike(input: CreateLikeInput!): Like @auth
  }
`
