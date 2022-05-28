export const {
  APP_PORT = 3000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret',
  SESS_LIFETIME = 1000 * 60 * 60 * 4,
  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env
export const IN_PROD = NODE_ENV === 'production'

export const SESS_OPTIONS = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  // rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: +SESS_LIFETIME,
    sameSite: false,
    secure: false,
    httpOnly: IN_PROD
  }
}
// when using apollo graphql tool  should change samesite and secure
// sameSite: 'none',
// secure: true,
export const REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  password: REDIS_PASSWORD,
  retryStrategy: times => Math.max(times * 100, 3000)
}
