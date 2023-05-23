import { app } from './app'
import { env } from './env'

app
  .listen({ port: env.DATABASE_PORT })
  .then(() => console.log('HTTP server running on port 3333 🚀'))
  .catch(() => console.log('Something went wrong.'))
