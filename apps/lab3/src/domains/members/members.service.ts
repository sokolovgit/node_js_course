import { inject, injectable } from 'inversify'

import TYPES from '../../constant/types'
import type { MembersRepository } from '../../database/domains/members/repositories/members.repository'

@injectable()
export class MembersService {
  constructor(
        @inject(TYPES.MembersRepository) private membersRepository: MembersRepository,
  ) {}

  async getMemberByPath(path: string) {
    const member = await this.membersRepository.getMemberByPath(path)

    if (!member) {
      throw new Error('Member not found')
    }

    member.photo = await this.fetchDogImageUrl()

    return member
  }

  private async fetchDogImageUrl(): Promise<string> {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await response.json()
      return data.message
    }
    catch (error) {
      console.error(error)
      return ''
    }
  }
}
