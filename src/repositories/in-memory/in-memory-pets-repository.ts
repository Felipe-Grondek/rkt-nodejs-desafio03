import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchManyPetsParams } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany({
    city,
    age,
    energy_level,
    environment,
    independence_level,
    size,
  }: SearchManyPetsParams) {
    const orgs = this.orgsRepository.orgs.filter((item) => item.city === city)

    const pets = this.pets
      .filter((pet) => orgs.some((org) => org.id === pet.org_id))
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) =>
        energy_level ? pet.energy_level === energy_level : true,
      )
      .filter((pet) => (environment ? pet.environment === environment : true))
      .filter((pet) =>
        independence_level
          ? pet.independence_level === independence_level
          : true,
      )
      .filter((pet) => (size ? pet.size === size : true))

    return pets
  }
}
