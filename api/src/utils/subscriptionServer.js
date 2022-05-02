import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import { IS_USER_ONLINE } from '../constants/Subscriptions'
import { User } from '../models'
import sessionMiddleware from './sessionMiddleware'
import pubSub from './Pubsub'

const subscriptionServer = (schema, httpServer) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  })

  return useServer({
    schema,
    context: (ctx, msg, args) => {
      if (ctx.extra.request) {
        return ctx.extra.request.session
      } else {
        return false
      }
    },
    onConnect: async (ctx) => {
      const authUser = await new Promise(resolve => {
        sessionMiddleware(ctx.extra.request, {}, () => {
          if (ctx.extra.request.session) {
            resolve(ctx.extra.request.session)
          }
        })
      })
      if (authUser.userId) {
        pubSub.publish(IS_USER_ONLINE, {
          isUserOnline: {
            userId: authUser.userId,
            isOnline: true
          }
        })
        return { userId: authUser.userId }
      } else {
        return false
      }
    },
    onDisconnect: async (ctx, code, reason) => {
      const initialContext = await ctx.extra.request.session
      if (initialContext && initialContext.userId) {
        pubSub.publish(IS_USER_ONLINE, {
          isUserOnline: {
            userId: initialContext.userId,
            isOnline: false
          }
        })
        await User.findOneAndUpdate(
          { _id: initialContext.userId },
          {
            isOnline: false
          }
        )
      }
    }
  }, wsServer)
}

export default subscriptionServer
