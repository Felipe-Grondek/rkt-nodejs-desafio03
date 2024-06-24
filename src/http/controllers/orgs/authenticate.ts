import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const validatedBody = authenticateOrgBodySchema.parse(request.body)

  try {
    const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

    const { org } = await authenticateOrgUseCase.execute(validatedBody)

    const token = await reply.jwtSign({}, { sign: { sub: org.id } })

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: org.id, expiresIn: '7d' } },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
