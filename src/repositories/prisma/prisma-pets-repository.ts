import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository, SearchManyPetsParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async searchMany({
    city,
    age,
    energy_level,
    environment,
    independence_level,
    size,
  }: SearchManyPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        size,
        energy_level,
        environment,
        independence_level,
        org: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }
}
