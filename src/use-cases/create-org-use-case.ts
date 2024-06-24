import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  password: string
  whatsapp: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: number | null
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}
  async execute(
    data: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(data.password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(data.email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
      latitude: data.latitude,
      longitude: data.longitude,
    })

    return { org }
  }
}
