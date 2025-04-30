import { PaginationOptions, Uuid } from "@/commons"
import { NotesRepository } from "@/database/domains/notes/repositories/notes.repository"
import { Injectable, NotFoundException } from "@nestjs/common"
import { NotesFilterOptions } from "./interfaces/notes-filter-options.interface"

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async getNotesPaginatedAndFiltered(
    paginationOptions: PaginationOptions,
    filterOptions?: NotesFilterOptions,
  ) {
    return this.notesRepository.getNotesFilteredAndPaginated(
      paginationOptions,
      filterOptions,
    )
  }

  async getNoteById(id: Uuid) {
    const note = await this.notesRepository.getNoteById(id)

    if (!note) {
      throw new NotFoundException("Note not found")
    }

    return note
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

  async deleteNotesByIds(ids: Uuid[]) {
    const notes = await this.notesRepository.findByIds(ids)

    if (notes.length !== ids.length) {
      throw new NotFoundException("Some notes not found")
    }

    await this.notesRepository.deleteNotesByIds(ids)
  }
}
