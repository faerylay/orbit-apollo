import { gql } from '@apollo/client'

export const LOG_IN = gql`
mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    id
    fullName
    email
    createdAt
  }
}
`

export const REGISTER = gql`
mutation SignUp($input: RegisterInput) {
  signUp(input: $input) {
    id
    fullName
    email
    createdAt
    updatedAt
  }
}
`;

export const LOG_OUT = gql`
  mutation {
    signOut
  }
`