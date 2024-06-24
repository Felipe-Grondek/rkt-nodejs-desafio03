import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyOrgUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case'

export async function nearbyOrgs(request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyOrgQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = fetchNearbyOrgQuerySchema.parse(request.query)

  const fetchNearbyOrgsUseCase = makeFetchNearbyOrgUseCase()

  const { orgs } = await fetchNearbyOrgsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ orgs })
}
