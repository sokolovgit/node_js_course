import { injectable } from 'inversify'
import fs from 'node:fs'
import path from 'node:path'

import type { Note } from '../entities/note.entity'

const FILE_PATH = path.join(__dirname, 'notes.json')

@injectable()
export class NotesRepository {
  private notes: Note[] = []

  constructor() {
    this.loadNotesSync()
  }

  findAllSync() {
    return this.notes
  }

  findAllCallback(callback: (notes: Note[]) => void) {
    setTimeout(() => {
      callback(this.notes)
    }, 100)
  }

  findAllPromise() {
    return new Promise<Note[]>((resolve) => {
      setTimeout(() => {
        resolve(this.notes)
      }, 100)
    })
  }

  async findAllAsync() {
    return await new Promise<Note[]>((resolve) => {
      setTimeout(() => {
        resolve(this.notes)
      }, 100)
    })
  }

  add(title: string, content: string) {
    const note = { id: Date.now(), title, content }
    this.notes.push(note)
    this.saveNotesSync()
    return note
  }

  addAsync(title: string, content: string, callback: (err: NodeJS.ErrnoException | null) => void) {
    const note = { id: Date.now(), title, content }
    this.notes.push(note)
    this.saveNotesCallback(callback)
  }

  addPromise(title: string, content: string): Promise<Note> {
    return new Promise((resolve, reject) => {
      const note = { id: Date.now(), title, content }
      this.notes.push(note)
      this.saveNotesPromise()
        .then(() => resolve(note))
        .catch(reject)
    })
  }

  async addAsyncAwait(title: string, content: string): Promise<Note> {
    const note = { id: Date.now(), title, content }
    this.notes.push(note)
    await this.saveNotesAsync()
    return note
  }

  delete(id: number) {
    this.notes = this.notes.filter(note => note.id !== id)
    this.saveNotesSync()
  }

  private loadNotesSync() {
    try {
      const data = fs.readFileSync(FILE_PATH, 'utf-8')

      this.notes = JSON.parse(data)
    }
    catch (error) {
      console.error('error', error)

      this.notes = []
    }
  }

  private saveNotesSync() {
    fs.writeFileSync(FILE_PATH, JSON.stringify(this.notes, null, 2), 'utf-8')
  }

  private saveNotesCallback(callback: (err: NodeJS.ErrnoException | null) => void) {
    fs.writeFile(FILE_PATH, JSON.stringify(this.notes, null, 2), 'utf-8', callback)
  }

  private saveNotesPromise(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(FILE_PATH, JSON.stringify(this.notes, null, 2), 'utf-8', (err) => {
        if (err)
          reject(err)
        else resolve()
      })
    })
  }

  private async saveNotesAsync() {
    await fs.promises.writeFile(FILE_PATH, JSON.stringify(this.notes, null, 2), 'utf-8')
  }
}
