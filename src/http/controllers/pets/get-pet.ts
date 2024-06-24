import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetBodyParams = z.object({
    id: z.string(),
  })

  const { id } = getPetBodyParams.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
