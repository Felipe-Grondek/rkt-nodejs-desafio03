import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org-use-case'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

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

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be hash ORG password upon registration', async () => {
    const { org } = await sut.execute(commonOrgData)

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute(commonOrgData)

    await expect(async () => {
      await sut.execute(commonOrgData)
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute(commonOrgData)

    expect(org.id).toEqual(expect.any(String))
  })
})
