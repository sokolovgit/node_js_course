import { inject } from 'inversify'
import { controller, httpGet, httpPost, request, requestParam, response } from 'inversify-express-utils'

import TYPES from '../../constant/types'

import type { Request, Response } from 'express'

import type { NotesService } from './notes.service'

@controller('/notes')
export class NotesController {
  constructor(@inject(TYPES.NotesService) private notesService: NotesService) {}

  @httpGet('/sync')
  getNotesSync(@response() res: Response) {
    const notes = this.notesService.getNotesSync()
    return res.render('notes', { notes, method: 'sync' })
  }

  @httpGet('/callback')
  getNotesCallback(@response() res: Response) {
    this.notesService.getNotesCallback((notes) => {
      res.render('notes', { notes, method: 'callback' })
    })
  }

  @httpGet('/promise')
  async getNotesPromise(@response() res: Response) {
    const notes = await this.notesService.getNotesPromise()
    return res.render('notes', { notes, method: 'promise' })
  }

  @httpGet('/async')
  async getNotesAsync(@response() res: Response) {
    const notes = await this.notesService.getNotesAsync()
    return res.render('notes', { notes, method: 'async' })
  }

  @httpPost('/add-sync')
  addNoteSync(@request() req: Request, @response() res: Response) {
    const { title, content, method } = req.body
    this.notesService.createNote(title, content)
    return res.redirect(this.getRedirectPath(method))
  }

  @httpPost('/add-callback')
  addNoteCallback(@request() req: Request, @response() res: Response) {
    const { title, content, method } = req.body
    this.notesService.createNoteAsync(title, content, (_err) => {
      if (_err) {
        return res.status(500).send('Error creating note')
      }
      return res.redirect(this.getRedirectPath(method))
    })
  }

  @httpPost('/add-promise')
  async addNotePromise(@request() req: Request, @response() res: Response) {
    const { title, content, method } = req.body
    await this.notesService.createNotePromise(title, content)
    return res.redirect(this.getRedirectPath(method))
  }

  @httpPost('/add-async')
  async addNoteAsyncAwait(@request() req: Request, @response() res: Response) {
    const { title, content, method } = req.body
    await this.notesService.createNoteAsyncAwait(title, content)
    return res.redirect(this.getRedirectPath(method))
  }

  @httpPost('/delete/:id')
  deleteNote(@request() req: Request, @requestParam('id') id: string, @response() res: Response) {
    const noteId = Number.parseInt(id)
    const { method } = req.body

    this.notesService.removeNote(noteId)

    return res.redirect(this.getRedirectPath(method))
  }

  private getRedirectPath(method: string) {
    const validMethods = ['sync', 'callback', 'promise', 'async']
    return validMethods.includes(method) ? `/notes/${method}` : '/notes/sync'
  }
}
