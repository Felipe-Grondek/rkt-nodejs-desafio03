import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org-use-case'

export function makeCreateOrgUseCase() {
  const prismaRepository = new PrismaOrgsRepository()
  const createOrgUseCase = new CreateOrgUseCase(prismaRepository)

  return createOrgUseCase
}
