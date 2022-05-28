import { gql } from '@apollo/client';

export const CREATE_NOTIFICATION = gql`
  mutation createNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      id
    }
  }
`;

/**
 * Deletes a notification
 */
export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($input: DeleteNotificationInput!) {
    deleteNotification(input: $input) {
      id
    }
  }
`;

/**
 * Gets notifications for user
 */
export const GET_USER_NOTIFICATION = gql`
  query GET_USER_NOTIFICATION($userId: ID!, $offset: Int, $limit: Int) {
    getUserNotifications(userId: $userId, offset: $offset, limit: $limit) {
      count
      notifications {
        id
        seen
        createdAt
        mention{
          id
        }
        author {
          id
          image
          fullName
        }
        follow {
          id
          follower
        }
        comment {
          id
          comment
          post {
            id
            title
          }
        }
        commentlikes {
          id
          comment {
            id
            comment
          }
        }
        like {
          id
          post {
            id
            title
          }
        }
        post{
          id
          title
        }
      }
    }
  }
`;

/**
 * Updates notification seen property
 */
export const UPDATE_NOTIFICATION_SEEN = gql`
  mutation($input: UpdateNotificationSeenInput!) {
    updateNotificationSeen(input: $input) {
      id
    }
  }
`;

/**
 * Get user's notifications in real time
 */
export const NOTIFICATION_CREATED_OR_DELETED = gql`
  subscription {
    notificationCreatedOrDeleted {
      operation
      notification {
        id
        createdAt
        author {
          id
          fullName
        }
        follow {
          id
        }
        comment {
          id
          post {
            id
          }
        }
        like {
          id
          post {
            id
          }
        }
      }
    }
  }
`;
