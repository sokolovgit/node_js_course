import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Member } from "../entities/member.entity"

@Injectable()
export class MembersRepository {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepo: Repository<Member>,
  ) {}

  async getMembers(): Promise<Member[]> {
    return await this.membersRepo.find()
  }

  async getMemberByPath(path: string): Promise<Member | null> {
    return await this.membersRepo.findOneBy({ path })
  }
}
