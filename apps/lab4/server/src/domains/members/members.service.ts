import { MembersRepository } from "@/database/domains/members/repositories/members.repository"
import { Injectable } from "@nestjs/common"

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async getMembers() {
    return this.membersRepository.getMembers()
  }
}
