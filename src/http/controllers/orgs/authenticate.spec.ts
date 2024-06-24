import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a ORG', async () => {
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

    const response = await request(app.server).post('/login').send({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
