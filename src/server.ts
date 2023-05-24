import { app } from './app'
import { env } from './env'

app
  .listen({ port: env.DATABASE_PORT })
  .then(() => console.log('HTTP server running on port 3333 🚀'))
  .catch((e) => console.log('Something went wrong: ', e.message))
