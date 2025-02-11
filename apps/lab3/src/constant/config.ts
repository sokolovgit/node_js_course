import { Container } from 'inversify'

import TYPES from './types'

import { NotesService } from '../domains/notes/notes.service'
import { NotesRepository } from '../database/domains/notes/repositories/notes.repository'

const container = new Container()

// in singleton scope, because we want to keep the same instance of the repository
// because of our in-memory storage
container.bind<NotesRepository>(TYPES.NotesRepository).to(NotesRepository).inSingletonScope()

container.bind<NotesService>(TYPES.NotesService).to(NotesService)

export { container }
