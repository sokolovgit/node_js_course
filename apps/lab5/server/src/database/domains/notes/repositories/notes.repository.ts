import { Inject, Injectable } from "@nestjs/common"

import { PG_CONNECTION } from "@/сonstant/pg-connection"
import { Pool } from "pg"

import { PaginatedResult, PaginationOptions } from "@/commons"

import { Note } from "../interfaces/note.interface"
import { runTransaction } from "../../utils"

@Injectable()
export class NotesRepository {
  constructor(@Inject(PG_CONNECTION) private readonly db: Pool) {}

  async getNoteById(id: Uuid): Promise<Note | null> {
    const { rows } = await this.db.query(`SELECT * FROM notes WHERE id = $1`, [
      id,
    ])

    return rows[0]
  }

  async getNotesPaginated(
    paginationOptions: PaginationOptions,
  ): Promise<PaginatedResult<Note>> {
    const { skip, take } = paginationOptions

    const { rows } = await this.db.query(
      `SELECT *, COUNT(*) OVER() AS total FROM notes ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [take, skip],
    )

    return {
      data: rows,
      meta: {
        total: rows.length > 0 ? parseInt(rows[0].total) : 0,
      },
    }
  }

  async findByIds(ids: Uuid[]): Promise<Note[]> {
    const { rows } = await this.db.query(
      `SELECT * FROM notes WHERE id = ANY($1)`,
      [ids],
    )

    return rows
  }

  async deleteNoteById(id: Uuid): Promise<void> {
    await runTransaction(this.db, async (client) => {
      await client.query(
        `DELETE FROM notes WHERE id = $1
      `,
        [id],
      )
    })
  }

  async deleteNotesByIds(ids: Uuid[]): Promise<void> {
    await runTransaction(this.db, async (client) => {
      await client.query(`DELETE FROM notes WHERE id = ANY($1)`, [ids])
    })
  }

  async createNote(noteData: {
    title: string
    content: string
  }): Promise<Note> {
    return await runTransaction(this.db, async (client) => {
      const { rows } = await client.query(
        `INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *`,
        [noteData.title, noteData.content],
      )

      return rows[0]
    })
  }

  async updateNoteById(
    id: Uuid,
    noteData: { title?: string; content?: string },
  ): Promise<Note> {
    return await runTransaction(this.db, async (client) => {
      const { rows } = await client.query(
        `UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *`,
        [noteData.title, noteData.content, id],
      )

      return rows[0]
    })
  }
}
