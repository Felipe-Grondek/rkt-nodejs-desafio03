import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'Org Javascript',
      author_name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
      whatsapp: '19999999999',
      cep: '12345700',
      state: 'Estado',
      city: 'Cidade',
      neighborhood: 'Bairro',
      street: 'Rua Principal',
      number: 11,
      latitude: -23.0062627,
      longitude: -47.1520109,
    },
  })

  const authResponse = await request(app.server).post('/login').send({
    email: 'johndoe@mail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    org,
  }
}
