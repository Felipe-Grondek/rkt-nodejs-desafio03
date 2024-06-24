import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet-use-case'

export function makeCreatePetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const prismaOrgRepository = new PrismaOrgsRepository()
  const createPetUseCase = new CreatePetUseCase(
    prismaPetRepository,
    prismaOrgRepository,
  )

  return createPetUseCase
}
