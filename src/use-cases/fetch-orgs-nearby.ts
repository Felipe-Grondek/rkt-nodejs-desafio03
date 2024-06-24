import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchOrgsNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchOrgsNearbyUseCaseResponse {
  orgs: Org[]
}

export class FetchOrgsNearbyUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchOrgsNearbyUseCaseRequest): Promise<FetchOrgsNearbyUseCaseResponse> {
    const orgs = await this.orgRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { orgs }
  }
}
