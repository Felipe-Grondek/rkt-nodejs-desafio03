import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org-use-case'

export function makeAuthenticateOrgUseCase() {
  const prismaRepository = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(prismaRepository)

  return authenticateOrgUseCase
}
