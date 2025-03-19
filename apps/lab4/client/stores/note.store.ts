import { defineStore } from 'pinia'
import { ref } from 'vue'
import { notesApi } from '~/api/domains/note'
import type { CreateNoteDto } from '~/api/dtos/notes/create-note.dto'
import type { UpdateNoteDto } from '~/api/dtos/notes/update-note.dto'
import type { PaginatedResponseMeta, PaginatedResponseDto } from '~/api/dtos/paginated-response.dto'
import type { Note } from '~/models/note.model'

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([])
  const meta = ref<PaginatedResponseMeta | null>(null)

  const page = ref(1)
  const take = ref(10)

  const fetchNotes = async () => {
    try {
      const response: PaginatedResponseDto<Note> = await notesApi.getNotesPaginated({
        page: page.value,
        take: take.value,
      })

      notes.value = response.data
      meta.value = response.meta
    }
    catch (error) {
      console.error('Failed to fetch notes:', error)
    }
  }

  const createNote = async (createNoteDto: CreateNoteDto) => {
    try {
      await notesApi.createNote(createNoteDto)

      await fetchNotes()
    }
    catch (error) {
      console.error('Failed to create note:', error)
    }
  }

  const updateNoteById = async (id: string, updateNoteDto: UpdateNoteDto) => {
    try {
      await notesApi.updateNoteById(id, updateNoteDto)

      await fetchNotes()
    }
    catch (error) {
      console.error('Failed to update note:', error)
    }
  }

  const deleteNoteById = async (id: string) => {
    try {
      await notesApi.deleteNoteById(id)

      await fetchNotes()
    }
    catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  const deleteMultipleNotes = async (ids: string[]) => {
    try {
      await notesApi.deleteMultipleNotes(ids)

      await fetchNotes()
    }
    catch (error) {
      console.error('Failed to delete notes:', error)
    }
  }

  return {
    notes,
    meta,
    page,
    take,
    fetchNotes,
    createNote,
    updateNoteById,
    deleteNoteById,
    deleteMultipleNotes,
  }
})
