import { Prisma, Pet } from '@prisma/client'

export interface SearchManyPetsParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(params: SearchManyPetsParams): Promise<Pet[]>
}
