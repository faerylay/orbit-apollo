import { gql } from 'apollo-server-express'

export default gql`
  type UserMention {
    id: ID!
    author: ID
    user: ID
    post: ID
  }
  type UserMentionPayload {
    id: ID!
    author: UserPayload
    user: UserPayload
    post: PostPayload
  }
  extend type Query {
    userMentionSearch(searchQuery: String! , postId:ID): [UserPayload] @auth
  }
`
