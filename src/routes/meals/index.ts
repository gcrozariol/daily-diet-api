import { knex } from '../../database'
import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import {
  validateCreateMealBody,
  validateIdFromParams,
  validateUpdateMealBody,
} from './meals.validation'
import { checkSessionIdExists } from '../../middleware/check-session-id-exists'

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
 * Get meals' metrics
 * @param {FastifyInstance} app Fastify Instance
 */
async function getMetrics(app: FastifyInstance) {
  app.get(
    '/metrics',
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const meals = await knex('meals')
        .where('user_id', req.cookies.sessionId)
        .select()

      // Get meals on and off a diet

      const mealsOnDiet = meals.filter((meal) => +meal.is_diet === 1)
      const mealsOffDiet = meals.filter((meal) => +meal.is_diet === 0)
      let bestSequenceOnDiet = null

      if (mealsOnDiet.length > 0) {
        // Get total meals on diet considering the date
        // This will return a record i.e. { date: total_meals, ... }

        const totalMealsOnDietPerDay = mealsOnDiet.reduce((prev, current) => {
          const date = new Date(current.date).toLocaleDateString()
          prev[date as keyof number] = (prev[date] || 0) + 1
          return prev
        }, {} as Record<string, number>)

        // Then, we sort the values within the object considering
        // the highest amount of meals per date.
        // This is going to result on the same data pattern of the
        // totalMealsOnDietPerDay method, however the first record is
        // the one we're using as it contains the highest amount of
        // meals on a diet

        const sortedMealsDescObj = Object.fromEntries(
          Object.entries(totalMealsOnDietPerDay).sort(([, a], [, b]) => b - a),
        )

        // Now, we transform the records into an array, so we can
        // get the first position of it

        const sortedMealsDescArr = []

        for (const date in sortedMealsDescObj) {
          sortedMealsDescArr.push({
            date,
            amount_of_meals: sortedMealsDescObj[date],
          })
        }

        // Lastly, set a constant with the values we want to send
        // back to the client

        bestSequenceOnDiet = sortedMealsDescArr[0]
      }

      res.status(200).send({
        total_meals: meals.length,
        meals_on_diet: mealsOnDiet.length,
        meals_off_diet: mealsOffDiet.length,
        best_sequence_on_diet: bestSequenceOnDiet,
      })
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
  getMetrics(app)
}
