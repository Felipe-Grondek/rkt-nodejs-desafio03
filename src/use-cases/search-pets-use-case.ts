import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    independence_level,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany({
      city,
      age,
      size,
      energy_level,
      independence_level,
      environment,
    })

    return { pets }
  }
}
