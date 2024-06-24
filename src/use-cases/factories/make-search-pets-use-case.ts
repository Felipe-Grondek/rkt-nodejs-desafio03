import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets-use-case'

export function makeSearchPetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const searchPetUseCase = new SearchPetsUseCase(prismaPetRepository)

  return searchPetUseCase
}
