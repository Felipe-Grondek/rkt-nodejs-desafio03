import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    org_id: z.string().uuid(),
  })

  const validatedBody = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute(validatedBody)
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
