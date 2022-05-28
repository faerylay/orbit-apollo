import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { IN_PROD } from '../config'

const createApolloserver = (httpServer, schema, subscriptionServer) => {
  return new ApolloServer({
    schema,
    cors: false,
    introspection: !IN_PROD,
    playground: IN_PROD ? false : { settings: { 'request.credentials': 'include' } },
    context: ({ req, res, connection }) => {
      if (connection) {
        return connection.context
      } else {
        return { req, res }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        serverWillStart: async () => {
          return {
            drainServer: async () => {
              await subscriptionServer.dispose()
            }
          }
        }
      }
    ]
  })
}
export default createApolloserver
