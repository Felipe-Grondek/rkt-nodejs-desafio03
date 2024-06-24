import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details-use-case'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

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

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get a pet detail', async () => {
    petsRepository.pets.push({
      ...commonPetData,
      id: 'pet-01',
    })

    const { pet } = await sut.execute({ pet_id: 'pet-01' })

    expect(pet.name).toEqual('Pet')
  })

  it('should not be able to get a pet detail with invalid id', async () => {
    await expect(async () => {
      await sut.execute({
        pet_id: 'invalid pet id',
      })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
