import { fastify } from 'fastify'

const app = fastify()

app.get('/', (req, res) => {
  res.status(200).send({
    message: "This is the second Rocketseat's Node.js project",
  })
})

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP server running on port 3333 🚀'))
  .catch(() => console.log('Something went wrong.'))
