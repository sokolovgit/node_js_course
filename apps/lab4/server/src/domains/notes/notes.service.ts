import { PaginationOptions } from "@/commons"
import { NotesRepository } from "@/database/domains/notes/repositories/notes.repository"
import { Injectable, NotFoundException } from "@nestjs/common"

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async getNotesPaginated(paginationOptions: PaginationOptions) {
    return this.notesRepository.getNotesPaginated(paginationOptions)
  }

  async deleteNoteById(id: Uuid) {
    const note = await this.notesRepository.getNoteById(id)

    if (!note) {
      throw new NotFoundException("Note not found")
    }

    await this.notesRepository.deleteNoteById(id)
  }

  async createNote(noteData: { title: string; content: string }) {
    return this.notesRepository.createNote(noteData)
  }

  async updateNoteById(
    id: Uuid,
    noteData: { title?: string; content?: string },
  ) {
    const note = await this.notesRepository.getNoteById(id)

    if (!note) {
      throw new NotFoundException("Note not found")
    }

    return this.notesRepository.updateNoteById(id, noteData)
  }
}
