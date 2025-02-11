import { inject, injectable } from 'inversify'
import TYPES from '../../constant/types'

import type { NotesRepository } from '../../database/domains/notes/repositories/notes.repository'

@injectable()
export class NotesService {
  constructor(@inject(TYPES.NotesRepository) private notesRepository: NotesRepository) {}

  getNotes() {
    return this.notesRepository.findAll()
  }

  createNote(title: string, content: string) {
    return this.notesRepository.add(title, content)
  }

  removeNote(id: number) {
    this.notesRepository.delete(id)
  }
}
