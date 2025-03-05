import { Global, Module } from "@nestjs/common"
import { MembersRepository } from "./repositories/members.repository"

@Global()
@Module({
  providers: [MembersRepository],
  exports: [MembersRepository],
})
export class MembersDomainModule {}
