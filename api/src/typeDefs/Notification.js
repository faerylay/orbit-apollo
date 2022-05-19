import { gql } from 'apollo-server-express'

export default gql`
  enum NotificationType {
    LIKE
    FOLLOW
    COMMENT
    COMMENTLIKES
    USERMENTION
    POSTCREATED
  }

  enum NotificationOperationType {
    CREATE
    DELETE
  }

  type Notification {
    id: ID!
    user: User
    author: User
    post: ID!
    like: Like
    follow: Follow
    comment: Comment
    commentlikes: CommentLikes
    type: NotificationType
    seen: Boolean
    createdAt: String
  }

  type NotificationPayload {
    id: ID
    user: UserPayload
    author: UserPayload
    like: LikePayload
    follow: Follow
    comment: CommentPayload
    post: PostPayload
    commentlikes: CommentLikesPayload
    seen: Boolean
    createdAt: String
  }

  type NotificationsPayload {
    count: String!
    notifications: [NotificationPayload]!
  }
  input CreateNotificationInput {
    userId: ID!
    authorId: ID!
    postId: ID
    commentId: ID
    notificationType: NotificationType!
    notificationTypeId: ID
  }

  input DeleteNotificationInput {
    id: ID!
  }

  input UpdateNotificationSeenInput {
    userId: ID!
    notiId: ID!
  }

  type NotificationCreatedOrDeletedPayload {
    operation: NotificationOperationType!
    notification: NotificationPayload
  }

  extend type Query {
    ## Gets notifications for specific user
    getUserNotifications(userId: ID!, offset: Int, limit: Int): NotificationsPayload
  }

  extend type Mutation {
    # Creates a new notification for user
    createNotification(input: CreateNotificationInput!): Notification @auth

    # Deletes a notification
    deleteNotification(input: DeleteNotificationInput!): Notification @auth

    # Updates notification seen values for user
    updateNotificationSeen(input: UpdateNotificationSeenInput!): Notification @auth
  }

  extend type Subscription {
    # Subscribes to notification created or deleted event
    notificationCreatedOrDeleted: NotificationCreatedOrDeletedPayload @auth
  }
`
