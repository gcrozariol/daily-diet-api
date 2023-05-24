import { FastifyInstance } from 'fastify'
import { validateCreateUser } from './users.validation'
import { knex } from '../database'
import { getSessionId } from '../middleware/check-session-id-exists'

/**
 * Create a user
 * @param {FastifyInstance} app Fastify Instance
 */
export async function createUser(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const body = validateCreateUser(req)

    if (body.success) {
      const sessionId = getSessionId(req, res)
      const data = { id: sessionId, ...body.data }
      await knex('users').insert(data)
      res.status(201).send(data)
    } else {
      res.status(422).send({ errors: body.error.issues })
    }
  })
}

/**
 * Export routes
 * @param {FastifyInstance} app Fastify Instance
 */
export async function usersRoutes(app: FastifyInstance) {
  createUser(app)
}
