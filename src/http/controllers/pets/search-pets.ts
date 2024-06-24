import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetBodyQuery = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, age, size, energy_level, environment } = getPetBodyQuery.parse(
    request.query,
  )

  const getPetUseCase = makeSearchPetUseCase()

  const { pets } = await getPetUseCase.execute({
    city,
    age,
    size,
    energy_level,
    environment,
  })

  return reply.status(200).send({ pets })
}
