import { split } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';

const REACT_APP_API_URL = 'http://localhost:4000/graphql'
const WEBSOCKET_API_URL = 'ws://localhost:4000/graphql'
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : REACT_APP_API_URL.replace('https://', 'wss://').replace('http://', 'ws://');


// const httpLink = new HttpLink({
//   uri: REACT_APP_API_URL,
//   credentials: 'include'
// });
const subscriptionClient = createClient({
  url: websocketApiUrl,
})
const wsLink = new GraphQLWsLink(subscriptionClient);

const uploadLink = createUploadLink({ uri: REACT_APP_API_URL, credentials: 'include' });
export const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  uploadLink
);

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    }
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});