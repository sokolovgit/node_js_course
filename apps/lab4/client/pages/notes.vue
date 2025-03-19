<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      Notes
    </h1>

    <!-- Create Note Button -->
    <Button
      class="mb-4"
      @click="isCreating = true"
    >
      Create Note
    </Button>

    <!-- Bulk Delete Button -->
    <Button
      class="mb-4"
      :disabled="selectedNotes.length === 0"
      @click="confirmBulkDelete"
    >
      Delete Selected
    </Button>

    <!-- Notes List with Drag and Drop -->
    <Draggable
      v-model="noteStore.notes"
      group="notes"
      item-key="id"
      class="flex flex-wrap gap-4 justify-center"
    >
      <template #item="{ element }">
        <NoteCard
          :note="element"
          @edit="editNote"
          @delete="deleteNote"
          @select="toggleSelection"
        />
      </template>
    </Draggable>

    <!-- Pagination Controls using shadcn -->
    <PaginationComponent
      :total="noteStore.meta?.itemCount || 0"
      :items-per-page="noteStore.meta?.take || 10"
      :current-page="noteStore.page"
      class="mt-4 flex justify-center"
      @update:current-page="changePage"
    />

    <!-- Note Edit Modal -->
    <NoteEditDialog
      :is-open="isEditing"
      :note="editForm"
      @update:is-open="isEditing = $event"
    />

    <!-- Note Create Modal -->
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
import NoteCard from '~/components/notes/NoteCard.vue'
import NoteEditDialog from '~/components/notes/NoteEditDialog.vue'
import NoteCreateDialog from '~/components/notes/NoteCreateDialog.vue'

import type { Note } from '~/models/note.model'

// Store for notes
const noteStore = useNoteStore()

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
