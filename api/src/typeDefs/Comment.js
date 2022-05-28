import { gql } from 'apollo-server-express'

export default gql`

  type Comment {
    id:ID!
    comment:String!
    image: File
    imagePublicId: String
    mentions:[String]
    author:ID
    post:ID
    commentlikes: [CommentLikes]
    createdAt:String!
  }

  type mentionlists {
    userId:ID!
    fullName:String!
  }

  type CommentPayload {
    id: ID
    comment: String
    image: String
    imagePublicId: String
    mentions:[mentionlists]
    author: UserPayload
    post: PostPayload
    commentlikes: [CommentLikesPayload]
    createdAt: String
  }

  input userMentions {
    userId:ID!
    fullName:String!
  }
  input CreateCommentInput {
    postId: ID!
    comment: String!
    image: Upload
    imagePublicId: String
    mentions: [userMentions]
  }
  input UpdateCommentInput {
    postId: ID!
    commentId: ID!
    comment: String!
    image: Upload
    imagePublicId: String
  }
  input DeleteCommentInput {
    postId: String!
    commentId: String!
    imagePublicId: String
  }
  extend type Query {
    comments:[CommentPayload]! @auth
  }

  extend type Mutation {
    createComment(input: CreateCommentInput! ):Comment! @auth
    updateComment(input: UpdateCommentInput!):Comment! @auth
    deleteComment(input: DeleteCommentInput!):Comment @auth
  }
`
