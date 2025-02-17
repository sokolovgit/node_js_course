import { inject } from 'inversify'
import { controller, httpGet, request, requestParam, response } from 'inversify-express-utils'
import type { Response } from 'express'
import TYPES from '../../constant/types'

import type { MembersService } from './members.service'

@controller('/members')
export class MembersController {
  constructor(
    @inject(TYPES.MembersService) private membersService: MembersService,
  ) {}

  // @httpGet('/')
  // async test(@request() req: Request, @response() res: Response) {
  //   // console.log(req)
  //   return res.render('members')
  // }

  @httpGet('/:path')
  async getMember(@requestParam('path') path: string, @response() res: Response) {
    // console.log(req)

    const member = await this.membersService.getMemberByPath(path)
    return res.render('member', { member })
  }
}
