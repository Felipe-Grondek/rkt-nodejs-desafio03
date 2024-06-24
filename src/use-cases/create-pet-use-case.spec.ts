import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet-use-case'
import { OrgNotFoundError } from './errors/org-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

const commonOrgData = {
  name: 'Org Javascript',
  author_name: 'John Doe',
  email: 'johndoe@mail.com',
  password_hash: '123456',
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

const commonPetData = {
  name: 'Pet',
  about: 'A short description',
  age: '3',
  energy_level: 'High',
  environment: 'spacious environment',
  independence_level: 'Low',
  size: 'bigger',
  org_id: '',
}

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create(commonOrgData)

    const { pet } = await sut.execute({
      ...commonPetData,
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet with invalid ORG', async () => {
    await expect(async () => {
      await sut.execute({
        ...commonPetData,
        org_id: 'invalid-org-id',
      })
    }).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
