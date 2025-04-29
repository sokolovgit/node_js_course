import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, In } from "typeorm"

import { PaginatedResult, PaginationOptions, Uuid } from "@/commons"
import { Note } from "../entities/note.entity"

@Injectable()
export class NotesRepository {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepo: Repository<Note>,
  ) {}

  async getNoteById(id: Uuid): Promise<Note | null> {
    return await this.notesRepo.findOneBy({ id })
  }

  async getNotesPaginated({
    skip,
    take,
  }: PaginationOptions): Promise<PaginatedResult<Note>> {
    const [data, total] = await this.notesRepo.findAndCount({
      order: { created_at: "DESC" },
      skip,
      take,
    })

    return {
      data,
      meta: { total },
    }
  }

  async findByIds(ids: string[]): Promise<Note[]> {
    return await this.notesRepo.find({
      where: { id: In(ids) },
    })
  }

  async deleteNoteById(id: string): Promise<void> {
    await this.notesRepo.delete(id)
  }

  async deleteNotesByIds(ids: string[]): Promise<void> {
    await this.notesRepo.delete(ids)
  }

  async createNote(noteData: Pick<Note, "title" | "content">): Promise<Note> {
    const note = this.notesRepo.create(noteData)
    return await this.notesRepo.save(note)
  }

  async updateNoteById(
    id: Uuid,
    noteData: Partial<Pick<Note, "title" | "content">>,
  ): Promise<Note> {
    await this.notesRepo.update(id, noteData)
    return await this.notesRepo.findOneByOrFail({ id })
  }
}
