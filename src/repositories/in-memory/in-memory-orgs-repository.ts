import { randomUUID } from 'node:crypto'
import { Org, Prisma } from '@prisma/client'
import { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number ? data.number : null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.orgs.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const orgs = this.orgs.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })

    return orgs
  }
}
