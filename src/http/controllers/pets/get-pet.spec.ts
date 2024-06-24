import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const petResponse = await prisma.pet.create({
      data: {
        name: 'Pet',
        about: 'A short description',
        age: '3',
        energy_level: 'High',
        environment: 'spacious environment',
        independence_level: 'Low',
        size: 'bigger',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .get(`/orgs/pets/${petResponse.id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Pet',
      }),
    )
  })
})
