import { gql } from 'apollo-server-express'

export default gql`
  type Post {
    id: ID!
    author: User!
    title: String!
    description: String!
    image: File
    imagePublicId: String
    likes: [Like]
    comments: [Comment]
    commentlikes: [CommentLikes]
    createdAt: String
    updatedAt: String
  }
  type PostPayload {
    id: ID!
    title: String
    description:String
    image: [String]
    imagePublicId: [String]
    author: UserPayload!
    likes: [LikePayload]
    comments: [CommentPayload]
    commentlikes: [CommentLikesPayload]
    likeCount:Int!
    commentCount:Int!
    createdAt: String
    updatedAt: String
  }
  type PostsPayload {
    posts: [PostPayload]! 
    count: String!
  }


  input CreatePostInput {
    title: String!
    description: String!
    image: [Upload]
    imagePublicId: String
  }
  input UpdatePostInput {
    postId: ID!
    title: String!
    description: String!
    image: Upload
    imagePublicId: String
  }
  input DeletePostInput {
    postId: ID!
    imagePublicId: String
  }

  extend type Query {
    getPost(postId:ID!): PostPayload @auth
    getPosts: [PostPayload]! @auth
    getUserPosts(userId: String!, offset: Int, limit: Int): PostsPayload @auth
    getFollowedPosts(userId: String!, offset: Int, limit: Int): PostsPayload @auth
  }
  extend type Mutation {
    createPost(input: CreatePostInput): PostPayload! @auth
    updatePost(input: UpdatePostInput): PostPayload! @auth
    deletePost(input: DeletePostInput): PostPayload @auth
  }
`
