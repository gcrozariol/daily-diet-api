import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { validateCreateUser } from './users.validation'
import { knex } from '../database'

/**
 * Create a user
 * @param {FastifyInstance} app Fastify Instance
 */
async function createUser(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const body = validateCreateUser(req)

    if (body.success) {
      const data = { id: randomUUID(), ...body.data }
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
