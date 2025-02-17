import { Container } from 'inversify'

import TYPES from './types'

import { NotesService } from '../domains/notes/notes.service'
import { NotesRepository } from '../database/domains/notes/repositories/notes.repository'
import { MembersRepository } from '../database/domains/members/repositories/members.repository'
import { MembersService } from '../domains/members/members.service'

const container = new Container()

// in singleton scope, because we want to keep the same instance of the repository
// because of our in-memory storage
container.bind<NotesRepository>(TYPES.NotesRepository).to(NotesRepository).inSingletonScope()
container.bind<NotesService>(TYPES.NotesService).to(NotesService)

container.bind<MembersRepository>(TYPES.MembersRepository).to(MembersRepository)
container.bind<MembersService>(TYPES.MembersService).to(MembersService)

export { container }
