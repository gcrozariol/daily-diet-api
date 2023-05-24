import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import {
  validateCreateMealBody,
  validateIdFromParams,
  validateUpdateMealBody,
} from './meals.validation'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

/**
 * Create meal
 * @param {FastifyInstance} app Fastify Instance
 */
async function createMeal(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const body = validateCreateMealBody(req)

    if (body.success) {
      const data = {
        id: randomUUID(),
        ...body.data,
        user_id: req.cookies.sessionId,
      }
      await knex('meals').insert(data)
      res.status(201).send(data)
    } else {
      res.status(422).send({ errors: body.error.issues })
    }
  })
}

/**
 * Get meals by user id
 * @param {FastifyInstance} app Fastify Instance
 */
async function getMealsByUserId(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const params = validateIdFromParams(req)

    if (params.success) {
      const data = await knex('meals')
        .where('id', params.data.id)
        .where('user_id', req.cookies.sessionId)
        .select()
      res.status(200).send(data)
    } else {
      const data = await knex('meals')
        .where('user_id', req.cookies.sessionId)
        .select()
      res.status(200).send(data)
    }
  })
}

/**
 * Get meals by user id
 * @param {FastifyInstance} app Fastify Instance
 */
async function getMealById(app: FastifyInstance) {
  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const params = validateIdFromParams(req)

    if (params.success) {
      const data = await knex('meals')
        .where('id', params.data.id)
        .where('user_id', req.cookies.sessionId)
        .select()
      res.status(200).send(data)
    } else {
      res.status(422).send({ errors: params.error.issues })
    }
  })
}

/**
 * Update meal
 * @param {FastifyInstance} app Fastify Instance
 */
async function updateMeal(app: FastifyInstance) {
  app.put('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const body = validateUpdateMealBody(req)
    const params = validateIdFromParams(req)

    if (body.success) {
      if (params.success) {
        await knex('meals')
          .where('id', params.data.id)
          .where('user_id', req.cookies.sessionId)
          .update({ ...body.data })
        res.status(200).send()
      } else {
        res.status(422).send({ errors: params.error.issues })
      }
    } else {
      res.status(422).send({ errors: body.error.issues })
    }
  })
}

/**
 * Delete meal
 * @param {FastifyInstance} app Fastify Instance
 */
async function deleteMeal(app: FastifyInstance) {
  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const params = validateIdFromParams(req)

      if (params.success) {
        await knex('meals')
          .where('id', params.data.id)
          .where('user_id', req.cookies.sessionId)
          .delete()
        res.status(204).send()
      } else {
        res.status(422).send({ errors: params.error.issues })
      }
    },
  )
}

/**
 * Meals routes
 * @param {FastifyInstance} app Fastify Instance
 */
export async function mealsRoutes(app: FastifyInstance) {
  createMeal(app)
  getMealById(app)
  getMealsByUserId(app)
  updateMeal(app)
  deleteMeal(app)
}
