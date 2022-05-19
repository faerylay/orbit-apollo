import { gql } from 'apollo-server-express'

export default gql`
  type CommentLikes {
    id: ID!
    comment: ID
    user: ID
  }
  type CommentLikesPayload {
    id: ID!
    comment: CommentPayload
    user: UserPayload
  }
  input CreateCommentLikesInput {
    commentId: ID!
  }
  extend type Mutation {
    createCommentLikes(input: CreateCommentLikesInput!): CommentLikes @auth
  }
`
