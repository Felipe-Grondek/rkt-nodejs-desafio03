import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
