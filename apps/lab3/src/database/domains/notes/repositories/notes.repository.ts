import { injectable } from 'inversify'

import type { Note } from '../entities/note.entity'

@injectable()
export class NotesRepository {
  private notes: Note[] = [
    {
      id: 1,
      title: 'First Note',
      content: 'This is a sample note.',
    },
  ]

  findAll() {
    return this.notes
  }

  add(title: string, content: string) {
    const note = { id: Date.now(), title, content }

    this.notes.push(note)

    return note
  }

  delete(id: number) {
    this.notes = this.notes.filter(note => note.id !== id)
  }
}
