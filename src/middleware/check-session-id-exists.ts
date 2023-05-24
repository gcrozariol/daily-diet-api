import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  req: FastifyRequest,
  res: FastifyReply,
) {
  if (!req.cookies.sessionId) {
    return res.status(401).send({ error: 'Unauthorized.' })
  }
}

export function getSessionId(req: FastifyRequest, res: FastifyReply) {
  let { sessionId } = req.cookies

  sessionId = randomUUID()

  res.cookie('sessionId', sessionId, {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  })

  return sessionId
}
