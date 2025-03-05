import { Inject, Injectable } from "@nestjs/common"
import { Pool } from "pg"

@Injectable()
export class NotesRepository {
  constructor(@Inject("PG_CONNECTION") private readonly db: Pool) {}
}
