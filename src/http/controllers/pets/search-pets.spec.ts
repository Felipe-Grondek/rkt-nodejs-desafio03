import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    await prisma.pet.deleteMany()
    await prisma.org.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { org, token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 2',
        about: 'A short description',
        age: '1',
        energy_level: 'small',
        environment: 'spacious environment',
        independence_level: 'Low',
        size: 'bigger',
        org_id: org.id,
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search pets by city and age', async () => {
    const { org, token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 2',
        about: 'A short description',
        age: '1',
        energy_level: 'small',
        environment: 'spacious environment',
        independence_level: 'Low',
        size: 'bigger',
        org_id: org.id,
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, age: '1' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
