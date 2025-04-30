<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">
        Notes
      </h1>
      <div class="flex space-x-4">
        <Button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          @click="isCreating = true"
        >
          Create Note
        </Button>
        <Button
          :disabled="selectedNotes.length === 0"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          @click="confirmBulkDelete"
        >
          Delete Selected
        </Button>
      </div>
    </div>

    <!-- Filter Input -->
    <div class="mb-4 max-w-md">
      <Input
        v-model="searchQuery"
        placeholder="Filter notes by title..."
        class="w-full"
        @input="filterNotes"
      />
    </div>

    <!-- Notes Grid -->
    <Draggable
      v-model="noteStore.notes"
      group="notes"
      item-key="id"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <template #item="{ element }">
        <NoteEditableCard
          :note="element"
          @edit="editNote"
          @delete="deleteNote"
          @select="toggleSelection"
        />
      </template>
    </Draggable>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <PaginationComponent
        :total="noteStore.meta?.itemCount || 0"
        :items-per-page="noteStore.meta?.take || 10"
        :current-page="noteStore.page"
        @update:current-page="changePage"
      />
    </div>

    <!-- Modals -->
    <NoteEditDialog
      :is-open="isEditing"
      :note="editForm"
      @update:is-open="isEditing = $event"
    />
    <NoteCreateDialog
      :is-open="isCreating"
      @update:is-open="isCreating = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Draggable from 'vuedraggable'
import { useNoteStore } from '~/stores/note.store'

import NoteEditableCard from '~/components/notes/NoteEditableCard.vue'
import NoteEditDialog from '~/components/notes/NoteEditDialog.vue'
import NoteCreateDialog from '~/components/notes/NoteCreateDialog.vue'

import type { Note } from '~/models/note.model'

// Store for notes
const noteStore = useNoteStore()
const searchQuery = ref('')

// Editing state
const isEditing = ref(false)
const isCreating = ref(false) // For creating a new note
const selectedNotes = ref<Note[]>([]) // To track selected notes
const editForm = ref<Note>({
  title: '',
  content: '',
  id: '',
})

// Fetch notes on page load
onMounted(() => {
  noteStore.fetchNotes()
})

const filterNotes = () => {
  noteStore.setFilter(searchQuery.value)
  noteStore.fetchNotes()
}

// Change page
const changePage = (newPage: number) => {
  noteStore.page = newPage
  noteStore.fetchNotes()
}

// Edit note
const editNote = (note: Note) => {
  editForm.value = { ...note }
  isEditing.value = true
}

// Delete note
const deleteNote = async (id: string) => {
  await noteStore.deleteNoteById(id)
}

// Toggle selection of notes
const toggleSelection = ({ note, selected }: { note: Note, selected: boolean }) => {
  if (selected) {
    selectedNotes.value.push(note)
  }
  else {
    selectedNotes.value = selectedNotes.value.filter(n => n.id !== note.id)
  }
}

// Confirm bulk delete action
const confirmBulkDelete = () => {
  if (window.confirm(`Are you sure you want to delete ${selectedNotes.value.length} notes?`)) {
    bulkDeleteNotes()
  }
}

// Perform the bulk delete action
const bulkDeleteNotes = async () => {
  const idsToDelete = selectedNotes.value.map(note => note.id)
  await Promise.all(idsToDelete.map(id => noteStore.deleteNoteById(id)))
  selectedNotes.value = [] // Reset selection after deletion
}
</script>
