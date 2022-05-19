import { gql } from '@apollo/client'


export const postAuthorPayload = `
    author {
      id
      fullName
      image
      notifications {
        id
        author {
          id
          fullName
        }
        follow {
          id
        }
        like {
          id
        }
        comment {
          id
        }
        commentlikes {
          id
        }
      }
    }
`;
const postsPayLoad = `
  posts {
    id
    title
    description
    image
    imagePublicId
    ${postAuthorPayload}
    likes {
      id
      user {
        id
      }
      post{
        id
      }
    }
    comments {
      id
      comment
    }
    likeCount
    commentCount
    createdAt
  }
`


export const CREATE_POST = gql`
mutation createPost($input: CreatePostInput) {
  createPost(input: $input) {
    id
    title
    description
    author{
      id
      fullName
    }
    likes{
      id
    }
    likeCount
    commentCount
    comments{
      id
    }
    createdAt
    updatedAt
  }
}
`

export const FETCH_POSTS_QUERY = gql`
query getPosts {
  getPosts {
    id
    ${postAuthorPayload}
    title
    description
    image
    imagePublicId
    likes {
      id
      user {
        id
      }
    }
    comments{
      id
      comment
    }
    likeCount
    commentCount
    createdAt
    updatedAt
  }
}
`


export const FETCH_POST = gql`
query getPost($postId: ID!) {
  getPost(postId: $postId) {
    id
    title
    description
    image
    imagePublicId
    ${postAuthorPayload}
    likes {
      id
      user {
        id
        fullName
        image
      }
      post {
        id
      }
    }
    comments {
      id
      comment
      image
      imagePublicId
      mentions {
        userId
        fullName
      }
      author {
        id
        fullName
        image
      }
      commentlikes {
        id
        user {
          id
          fullName
          image
        }
        comment {
          id
        }
      }
      createdAt
    }
    likeCount
    commentCount
    createdAt
  }
}
`


export const UPDATE_POST = gql`
mutation updatePost($input: UpdatePostInput) {
  updatePost(input: $input) {
    id
    title
    description
    author{
      id
      fullName
    }
    likes{
      id
    }
    comments{
      id
    }
    likeCount
    commentCount
    createdAt
    updatedAt
  }
}
`

export const LIKE_POST = gql`
mutation CreateLike($input: CreateLikeInput!) {
  createLike(input: $input) {
    id
    post
    user
  }
}
`


export const DELETE_POST = gql`
mutation DeletePost($input: DeletePostInput) {
  deletePost(input: $input) {
    id
    title
    description
    author {
      fullName
    }
    createdAt
    updatedAt
  }
}
`
export const GET_FOLLOWED_POSTS = gql`
query GetFollowedPosts($userId: String!, $offset: Int, $limit: Int) {
  getFollowedPosts(userId: $userId, offset: $offset, limit: $limit) {
    ${postsPayLoad}
    count
  }
}
`

export const GET_USER_POSTS = gql`
query GetUserPosts($userId: String!, $offset: Int, $limit: Int) {
  getUserPosts(userId: $userId, offset: $offset, limit: $limit) {
    ${postsPayLoad}
    count
  }
}
`

