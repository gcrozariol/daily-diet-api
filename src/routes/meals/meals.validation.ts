import { z } from 'zod'
import { FastifyRequest } from 'fastify'

/**
 * Validation of the create meal request body
 * @param {FastifyRequest} req FastifyRequest
 * @returnssuccess status, then data with validated request body or error
 */
export function validateCreateMealBody(req: FastifyRequest) {
  return z
    .object({
      name: z.string(),
      description: z.string(),
      is_diet: z.boolean(),
      date: z.string().transform((value) => new Date(value).toISOString()),
    })
    .strict()
    .safeParse(req.body)
}

/**
 * Validation of the update meal request body
 * @param {FastifyRequest} req FastifyRequest
 * @returns success status, then data with validated request body or error
 */
export function validateUpdateMealBody(req: FastifyRequest) {
  return z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      is_diet: z.boolean().optional(),
      date: z
        .string()
        .transform((value) => new Date(value).toISOString())
        .optional(),
    })
    .strict()
    .safeParse(req.body)
}

/**
 * Validation of the id from request parameters
 * @param {FastifyRequest} req FastifyRequest
 * @returns success status, then data with id or error
 */
export function validateIdFromParams(req: FastifyRequest) {
  return z.object({ id: z.string().uuid() }).safeParse(req.params)
}
