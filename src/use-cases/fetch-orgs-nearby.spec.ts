import { expect, describe, it, beforeEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchOrgsNearbyUseCase } from './fetch-orgs-nearby'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchOrgsNearbyUseCase

describe('Fetch Orgs Nearby Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsNearbyUseCase(orgsRepository)
  })

  it('should be able to fetch nearby ORGs', async () => {
    orgsRepository.orgs.push({
      id: 'org-01',
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
      latitude: new Decimal(-23.0062627),
      longitude: new Decimal(-47.1520109),
    })

    orgsRepository.orgs.push({
      id: 'org-02',
      name: 'Org Typescript',
      author_name: 'Josh Moe',
      email: 'joshmoe@mail.com',
      password_hash: '123456',
      whatsapp: '19999999999',
      cep: '12345700',
      state: 'Estado',
      city: 'Cidade',
      neighborhood: 'Bairro',
      street: 'Rua Principal',
      number: 11,
      latitude: new Decimal(-23.1880606),
      longitude: new Decimal(-46.8853765),
    })

    const { orgs } = await sut.execute({
      userLatitude: -23.0062627,
      userLongitude: -47.1520109,
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([expect.objectContaining({ name: 'Org Javascript' })])
  })
})
