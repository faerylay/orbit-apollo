import { gql } from '@apollo/client'

export const comment = `
  id
  comment
  author
  post
  createdAt
`
export const CREATE_COMMENT_LIKES = gql`
mutation createCommentLike($input: CreateCommentLikesInput!) {
  createCommentLikes(input: $input) {
    id
    user
    comment
  }
}
`
export const CREATE_COMMENT = gql`
mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ${comment}
  }
}
`

export const UPDATE_COMMENT = gql`
mutation updateComment($updateCommentInput2: UpdateCommentInput!) {
  updateComment(input: $updateCommentInput2) {
    ${comment}
  }
}
`

export const DELETE_COMMENT = gql`
mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    ${comment}
  }
}
`
export const COMMENTS = gql`
query Query {
  comments {
    id
    comment
    author {
      fullName
    }
    post {
      title
    }
    createdAt
  }
}
`