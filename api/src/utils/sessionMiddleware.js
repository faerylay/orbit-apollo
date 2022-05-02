import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import { SESS_OPTIONS, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../config'

const RedisStore = connectRedis(session)
const store = new RedisStore({
  client: new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    pass: REDIS_PASSWORD
  })
})
export default session({ store, ...SESS_OPTIONS })
