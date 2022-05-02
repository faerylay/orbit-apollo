import { gql } from '@apollo/client'

export const USER_MENTION = gql`
  query userMentionSearch($searchQuery: String!, $postId: ID) {
    userMentionSearch(searchQuery: $searchQuery, postId: $postId) {
      id
      fullName
      image
    }
  }
`