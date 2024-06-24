import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Nearby Orgs (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby orgs', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Javascript',
      author_name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      whatsapp: '19999999999',
      cep: '12345700',
      state: 'Estado',
      city: 'Cidade',
      neighborhood: 'Bairro',
      street: 'Rua Principal',
      number: 11,
      latitude: -23.0062627,
      longitude: -47.1520109,
    })

    await request(app.server).post('/orgs').send({
      name: 'Org Typescript',
      author_name: 'Josh Moe',
      email: 'joshmoe@mail.com',
      password: '123456',
      whatsapp: '19999999999',
      cep: '12345700',
      state: 'Estado',
      city: 'Cidade 2',
      neighborhood: 'Bairro',
      street: 'Rua Principal',
      number: 12,
      latitude: -23.1880606,
      longitude: -46.8853765,
    })

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({
        latitude: -23.0062627,
        longitude: -47.1520109,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs).toEqual([
      expect.objectContaining({
        name: 'Org Javascript',
      }),
    ])
  })
})
