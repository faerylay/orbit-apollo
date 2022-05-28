import { gql } from 'apollo-server-express';

export default gql`
  union SearchResult = User | Post
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type User {
    id: ID!
    fullName: String!
    email: String!
    isOnline: Boolean
    image: File
    imagePublicId: String
    coverImage: File
    coverImagePublicId: String
    posts: [Post]
    likes: [Like]
    commentlikes: [CommentLikes]
    comments: [Comment]
    following: [Follow]
    followers: [Follow]
    notifications: [NotificationPayload]
    createdAt: String
    updatedAt: String
  }

  type UserPayload {
    id: ID!
    fullName: String
    email: String
    password: String
    isOnline: Boolean
    image: String
    imagePublicId: String
    coverImage: String
    coverImagePublicId: String
    posts: [PostPayload]
    likes: [Like]
    commentlikes: [CommentLikes]
    followers: [FollowPayload]
    following: [FollowPayload]
    followerCount: Int!
    followingCount: Int!
    notifications: [NotificationPayload]
    newNotifications: [NotificationPayload]
    newConversations: [ConversationsPayload]
    unseenMessage: Boolean
    createdAt: String
    updatedAt: String
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type IsUserOnlinePayload {
    userId: ID!
    isOnline: Boolean
  }

  type UserAndPostPayload {
    posts: [PostPayload]
    users: [UserPayload]
  }

  input UploadUserPhotoInput {
    id: ID!
    image: Upload!
    imagePublicId: String
    isCover: Boolean
  }


  extend type Query{
    getAuthUser: UserPayload @auth
    getUser(id:ID!):UserPayload @auth
    getUsers: [UserPayload]!  @auth
    searchUsers(searchQuery: String!): [UserPayload] @auth
    searchs(searchQuery: String!): [SearchResult!] @auth
    suggestPeople: [UserPayload] @auth
  }
  extend type Mutation {
    signUp(input: RegisterInput): User! @guest
    signIn(email: String!, password: String!): User! @guest
    signOut: Boolean
    # Uploads user Profile or Cover photo
    uploadUserPhoto(input: UploadUserPhotoInput!): UserPayload @auth
  }
  extend type Subscription {
    isUserOnline(authUserId: ID!, userId: ID!): IsUserOnlinePayload
  }
`;
