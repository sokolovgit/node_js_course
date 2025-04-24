import { Module } from "@nestjs/common"
import { MembersController } from "./members.controller"
import { MembersService } from "./members.service"

@Module({
  imports: [],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
