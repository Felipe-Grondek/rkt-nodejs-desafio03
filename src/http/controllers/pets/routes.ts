import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { validateJwt } from '@/http/middlewares/validate-jwt'
import { getPet } from './get-pet'
import { searchPets } from './search-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [validateJwt] }, createPet)
  app.get('/orgs/pets/:id', getPet)
  app.get('/orgs/pets', searchPets)
}
