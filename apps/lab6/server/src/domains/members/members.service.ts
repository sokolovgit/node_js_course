import { MembersRepository } from "@/database/domains/members/repositories/members.repository"
import { Injectable } from "@nestjs/common"

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async getMembers() {
    const members = await this.membersRepository.getMembers()

    for (const member of members) {
      member.photo = await this.fetchDogImageUrl()
    }

    return members
  }

  private async fetchDogImageUrl(): Promise<string> {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random")
      const data = await response.json()
      return data.message
    } catch (error) {
      console.error(error)
      return ""
    }
  }
}
