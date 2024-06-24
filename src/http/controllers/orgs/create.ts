import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.number(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const validatedBody = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute(validatedBody)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
