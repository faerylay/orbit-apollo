import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { errorLink, splitLink } from './apolloLink'

const createApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getPosts: {
              merge(existing, incoming) {
                return incoming;
              },
            },
            getPost: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          }
        },
        Post: {
          fields: {
            likes: {
              merge(existing, incoming) {
                return incoming;
              }
            },
            comments: {
              merge(existing, incoming) {
                return incoming;
              }
            },
            notifications: {
              merge(existing, incoming) {
                return incoming;
              }
            },
          }
        },
        Notification: {
          fields: {
            user: {
              merge(existing, incoming) {
                return incoming;
              }
            }
          }
        },
        User: {
          fields: {
            notifications: {
              merge(existing, incoming) {
                return incoming;
              }
            },
            posts: {
              merge(existing, incoming) {
                return incoming;
              },
            }
          }
        },
        UserPayload: {
          fields: {
            posts: {
              merge(existing, incoming) {
                return incoming
              }
            },
            // me: {
            //   merge(existing, incoming) {
            //     return incoming
            //   }
            // }
          }
        }
      }
    })
  });
}
export default createApolloClient