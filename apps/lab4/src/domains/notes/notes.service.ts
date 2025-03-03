import { inject, injectable } from 'inversify'
import TYPES from '../../constant/types'

import type { NotesRepository } from '../../database/domains/notes/repositories/notes.repository'
import type { Note } from '../../database/domains/notes/entities/note.entity'

@injectable()
export class NotesService {
  constructor(@inject(TYPES.NotesRepository) private notesRepository: NotesRepository) {}

  getNotesSync() {
    return this.notesRepository.findAllSync()
  }

  getNotesCallback(callback: (notes: Note[]) => void) {
    this.notesRepository.findAllCallback(callback)
  }

  getNotesPromise() {
    return this.notesRepository.findAllPromise()
  }

  async getNotesAsync() {
    return await this.notesRepository.findAllAsync()
  }

  createNote(title: string, content: string) {
    return this.notesRepository.add(title, content)
  }

  createNoteAsync(title: string, content: string, callback: (err: NodeJS.ErrnoException | null) => void) {
    this.notesRepository.addAsync(title, content, callback)
  }

  createNotePromise(title: string, content: string) {
    return this.notesRepository.addPromise(title, content)
  }

  async createNoteAsyncAwait(title: string, content: string) {
    return await this.notesRepository.addAsyncAwait(title, content)
  }

  removeNote(id: number) {
    this.notesRepository.delete(id)
  }
}
