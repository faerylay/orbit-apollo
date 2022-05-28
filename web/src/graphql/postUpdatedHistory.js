import { gql } from '@apollo/client'

export const POST_UPDATED_HISTORIES = gql`
query postupdatedhistorys( $postId: ID!) {
  postupdatedhistorys( postId: $postId) {
    id
    title
    description
    image
    post {
      id
    }
    user {
      fullName
      image
    }
    createdAt
  }
}
`
export const CREATE_POST_UPDATED_HISTORY = gql`
mutation createPostUpdatedHistory($input: CreateUpdatedHistoryInput!) {
  createPostUpdatedHistory(input: $input) {
    user
    post
    title
    description
  }
}
`