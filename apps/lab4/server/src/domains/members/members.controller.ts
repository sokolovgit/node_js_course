import { Controller, Get } from "@nestjs/common"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { MembersService } from "./members.service"

@Controller("members")
@ApiTags("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: "Get all members" })
  @ApiOkResponse({ description: "Members list" })
  async getMembers() {
    return this.membersService.getMembers()
  }
}
