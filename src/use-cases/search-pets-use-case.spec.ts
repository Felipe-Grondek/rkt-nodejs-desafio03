import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from '@/use-cases/search-pets-use-case'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

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

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    await petsRepository.create({
      ...commonPetData,
      org_id: org.id,
    })
    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 2',
      org_id: org.id,
    })

    const org2 = await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
      city: 'City 2',
      latitude: -23.1880606,
      longitude: -46.8853765,
    })

    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 3',
      org_id: org2.id,
    })

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    await petsRepository.create({
      ...commonPetData,
      age: '1',
      org_id: org.id,
    })
    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 2',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, age: '1' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    await petsRepository.create({
      ...commonPetData,
      size: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 2',
      size: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 3',
      size: 'big',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, size: 'small' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy_level', async () => {
    const org = await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    await petsRepository.create({
      ...commonPetData,
      energy_level: 'low',
      org_id: org.id,
    })

    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 2',
      energy_level: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 3',
      energy_level: 'high',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, energy_level: 'low' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create({
      ...commonOrgData,
      password_hash: await hash(commonOrgData.password, 6),
    })

    await petsRepository.create({
      ...commonPetData,
      environment: 'indoor',
      org_id: org.id,
    })

    await petsRepository.create({
      ...commonPetData,
      name: 'Pet 2',
      environment: 'outdoor',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(pets).toHaveLength(1)
  })
})
