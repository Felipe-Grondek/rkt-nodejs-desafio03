import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create Pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet',
        about: 'A short description',
        age: '3',
        energy_level: 'High',
        environment: 'spacious environment',
        independence_level: 'Low',
        size: 'bigger',
        org_id: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
