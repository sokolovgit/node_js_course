import { inject } from 'inversify'
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils'

import TYPES from '../../constant/types'

import type { Request, Response } from 'express'

import type { NotesService } from './notes.service'

@controller('/notes')
export class NotesController {
  constructor(@inject(TYPES.NotesService) private notesService: NotesService) {}

  @httpGet('/')
  getNotes(@response() res: Response) {
    const notes = this.notesService.getNotes()

    return res.render('notes', { notes })
  }

  @httpPost('/add')
  addNote(@request() req: Request, @response() res: Response) {
    const { title, content } = req.body

    this.notesService.createNote(title, content)

    return res.redirect('/notes')
  }

  @httpPost('/delete/:id')
  deleteNote(@request() req: Request, @response() res: Response) {
    const noteId = Number.parseInt(req.params.id)

    this.notesService.removeNote(noteId)

    return res.redirect('/notes')
  }
}
