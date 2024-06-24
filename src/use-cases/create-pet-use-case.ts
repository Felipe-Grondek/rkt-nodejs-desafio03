import { Pet } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
