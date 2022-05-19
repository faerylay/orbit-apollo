import { RedisPubSub } from 'graphql-redis-subscriptions'
import { PubSub } from 'graphql-subscriptions'
import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PORT, NODE_ENV } from '../config'
const REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  retryStrategy: times => Math.max(times * 100, 3000)
}
// const redisConnectionListener = (err) => {
//   if (err) console.error(err)
//   console.info('Succefully connected to redis')
// }

const redis = new RedisPubSub({
  // connection: REDIS_OPTIONS,
  // connectionListener: redisConnectionListener,
  publisher: new Redis(REDIS_OPTIONS),
  subscriber: new Redis(REDIS_OPTIONS)
})
const pubSub = NODE_ENV === 'development' ? new PubSub() : redis
export default pubSub
