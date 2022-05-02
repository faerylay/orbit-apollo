import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { auth, guest, upper } from './directives'
import { sessionMiddleware, createApolloserver, createSubscriptionServer } from './utils'

const createApp = async () => {
  try {
    const app = express()
    const httpServer = createServer(app)

    app.disable('x-powered-by')
    app.use(sessionMiddleware)
    app.use(graphqlUploadExpress())
    app.set('trust proxy', process.env.NODE_ENV !== 'production')

    let schema = makeExecutableSchema({ typeDefs, resolvers })
    schema = auth(schema, 'auth')
    schema = guest(schema, 'guest')
    schema = upper(schema, 'upper')

    const subscriptionServer = createSubscriptionServer(schema, httpServer)
    const server = createApolloserver(httpServer, schema, subscriptionServer)
    await server.start()

    server.applyMiddleware({ app, path: '/graphql', cors: { origin: ['https://studio.apollographql.com', 'http://localhost:4000', 'http://localhost:3000'], credentials: true } })
    httpServer.listen({ port: process.env.PORT },
      () => console.log(`http://localhost:${process.env.PORT}${server.graphqlPath}`)
    )
  } catch (error) {
    console.log(error)
  }
}
export default createApp
