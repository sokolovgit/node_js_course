import apiClient from '../api'
import type { CreateNoteDto } from '../dtos/notes/create-note.dto'
import type { UpdateNoteDto } from '../dtos/notes/update-note.dto'
import type { PaginatedResponseDto } from '../dtos/paginated-response.dto'
import type { PaginationDto } from '../dtos/pagination.dto'
import type { Note } from '~/models/note.model'

export const notesApi = {
  getNotesPaginated: async (paginationDto: PaginationDto): Promise<PaginatedResponseDto<Note>> => {
    const result = await apiClient.get('/notes').query(paginationDto)

    if (!result.ok) {
      throw new Error('Failed to fetch notes')
    }

    return result.body
  },

  createNote: async (createNoteDto: CreateNoteDto): Promise<Note> => {
    const result = await apiClient.post('/notes').send(createNoteDto)

    if (!result.ok) {
      throw new Error('Failed to create note')
    }

    return result.body
  },

  updateNoteById: async (id: string, updateNoteDto: UpdateNoteDto): Promise<Note> => {
    const result = await apiClient.patch(`/notes/${id}`).send(updateNoteDto)

    if (!result.ok) {
      throw new Error('Failed to update note')
    }

    return result.body
  },

  deleteNoteById: async (id: string): Promise<void> => {
    const result = await apiClient.delete(`/notes/${id}`)

    if (!result.ok) {
      throw new Error('Failed to delete note')
    }
  },

  deleteMultipleNotes: async (ids: string[]): Promise<void> => {
    const result = await apiClient.delete('/notes/multiple').send({ ids })

    if (!result.ok) {
      throw new Error('Failed to delete notes')
    }
  },

}
