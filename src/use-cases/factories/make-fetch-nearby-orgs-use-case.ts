import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchOrgsNearbyUseCase } from '../fetch-orgs-nearby'

export function makeFetchNearbyOrgUseCase() {
  const prismaRepository = new PrismaOrgsRepository()
  const fetchNearbyOrgsUseCase = new FetchOrgsNearbyUseCase(prismaRepository)

  return fetchNearbyOrgsUseCase
}
