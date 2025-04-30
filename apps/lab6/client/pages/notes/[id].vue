<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      <NoteInfoCard
        v-if="note"
        :note="note"
      />
      <div
        v-else
        class="text-center text-gray-600"
      >
        Loading note...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNoteStore } from '~/stores/note.store'
import type { Note } from '~/models/note.model'
import NoteInfoCard from '~/components/notes/NoteInfoCard.vue'

const route = useRoute()
const noteStore = useNoteStore()

const note = ref<Note | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  const result = await noteStore.getNoteById(id)
  if (result) {
    note.value = result
  }
})
</script>
