export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('ORG with this e-mail already exists!')
  }
}
