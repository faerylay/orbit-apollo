import { gql } from '@apollo/client'



/**
 * Uploads user photo
 */

const userPayload = `
  id
  fullName
  image
  imagePublicId
  coverImage
  coverImagePublicId
  createdAt
  isOnline
`;
export const UPLOAD_PHOTO = gql`
  mutation uploadUserPhoto($input: UploadUserPhotoInput!) {
    uploadUserPhoto(input: $input) {
      id
    }
  }
`;

export const GET_AUTH_USER = gql`
  query getAuthUser {
  getAuthUser {
    ${userPayload}
    following {
      id
      author {
        id
        isOnline
        fullName
        image
      }
      follower {
        id
        fullName
      }
    }
    newNotifications {
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
    newConversations {
      id
      fullName
      image
      lastMessage
      lastMessageCreatedAt
    }
    likes {
      id
      # user
      # post
    }
    posts {
      id
    }
    following {
      id
    }
    followers {
      id
    }
  }
} 
`


export const FETCH_ALL_USERS = gql`
query GetUsers {
  getUsers {
    id
    fullName
    isOnline
  }
}
`


export const FETCH_USER = gql`
query getUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    ${userPayload}
    followers {
      id
      follower {
        id
        fullName
      }
    }
    following {
      id
      author {
        id
        fullName
      }
    }
    followerCount
    followingCount
    posts {
      id
      title
      description
      author {
        id
        fullName
      }
      likes {
        id
        user {
          id
        }
      }
      comments {
        id
        comment
        author {
          id
          fullName
        }
        createdAt
      }
      likeCount
      commentCount
      createdAt
    }
    notifications {
      id
      author {
        id
        fullName
      }
      like {
        id
      }
      follow {
        id
      }
      comment {
        id
      }
    }
  }
}
`

export const SEARCH_USERS = gql`
query SearchUsers($searchQuery: String!) {
  searchUsers(searchQuery: $searchQuery) {
    id
    fullName
  }
}
`
export const SEARCHS = gql`
query Searchs($searchQuery: String!) {
  searchs(searchQuery: $searchQuery) {
    __typename
    ... on User {
      id
      fullName
    }
    ... on Post {
      id
      title
      description
      author {
        id
        fullName
      }
    }
  }
}
`
export const USER_SUGGESTION = gql`
query SuggestPeople {
  suggestPeople {
    id
    fullName
    followers {
      id
      follower {
        id
        fullName
      }
    }
    following {
      id
      author {
        id
        fullName
      }
    }
  }
}
`

export const IS_USER_ONLINE = gql`
  subscription IsUserOnline($authUserId: ID!, $userId: ID!) {
  isUserOnline(authUserId: $authUserId, userId: $userId) {
    userId
    isOnline
  }
}
`;



