import { Global, Module } from "@nestjs/common"
import { MembersRepository } from "./repositories/members.repository"
import { Member } from "./entities/member.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MembersRepository],
  exports: [MembersRepository],
})
export class MembersDomainModule {}
