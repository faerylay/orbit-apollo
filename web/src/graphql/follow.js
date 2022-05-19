import { gql } from '@apollo/client'

export const CREATE_FOLLOW = gql`
mutation createFollow($input: CreateFollowInput!) {
  createFollow(input: $input) {
    id
    author
    follower
  }
}
`