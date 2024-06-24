import { FastifyInstance } from 'fastify'
import { createOrg } from './create'
import { authenticate } from './authenticate'
import { nearbyOrgs } from './fetch-nearby-orgs'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/login', authenticate)
  app.get('/orgs/nearby', nearbyOrgs)
}
