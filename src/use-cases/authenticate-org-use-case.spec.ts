import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org-use-case'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

const commonOrgData = {
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
}

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    const { org } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'johndoe@mail.com',
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
