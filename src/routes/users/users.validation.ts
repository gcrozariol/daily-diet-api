import { z } from 'zod'
import { FastifyRequest } from 'fastify'

/**
 * Validate create user request
 * @param req FastifyRequest
 * @returns validated data or error
 */
export function validateCreateUser(req: FastifyRequest) {
  return z
    .object(
      {
        name: z.string(),
        email: z.string().email(),
        avatar: z
          .string()
          .url()
          .optional()
          .transform((value) => value ?? null),
      },
      {
        required_error:
          'This object receives name and email as required parameters, and avatar as an optional one.',
      },
    )
    .strict()
    .safeParse(req.body)
}
