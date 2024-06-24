import { Org, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = prisma.org.findUnique({
      where: { email },
    })

    return org
  }

  async findById(id: string) {
    const org = prisma.org.findUnique({
      where: { id },
    })

    return org
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const orgs = prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `

    return orgs
  }
}
