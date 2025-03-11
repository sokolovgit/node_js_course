import { PG_CONNECTION } from "@/сonstant/pg-connection"
import { Inject, Injectable } from "@nestjs/common"
import { Pool } from "pg"
import { Member } from "../interfaces/member.interface"

@Injectable()
export class MembersRepository {
  constructor(@Inject(PG_CONNECTION) private readonly db: Pool) {}

  async getMembers(): Promise<Member[]> {
    const { rows } = await this.db.query("SELECT * FROM members")

    return rows.map((member) => ({
      ...member,
      academic: {
        faculty: member.academic_faculty,
        department: member.academic_department,
      },
    }))
  }

  async getMemberByPath(path: string): Promise<Member> {
    const { rows } = await this.db.query<Member>(
      "SELECT * FROM members WHERE path = $1 LIMIT 1",
      [path],
    )

    return rows[0]
  }
}
