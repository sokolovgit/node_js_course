import { Controller, Get } from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { MembersService } from "./members.service"
import { MemberDto } from "./dtos/member.dto"

@Controller("members")
@ApiTags("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: "Get all members" })
  @ApiOkResponse({ description: "Members list", type: MemberDto })
  async getMembers() {
    const members = await this.membersService.getMembers()

    return members.map((member) => new MemberDto(member))
  }
}
