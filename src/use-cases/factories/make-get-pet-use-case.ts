import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details-use-case'

export function makeGetPetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const getPetUseCase = new GetPetDetailsUseCase(prismaPetRepository)

  return getPetUseCase
}
