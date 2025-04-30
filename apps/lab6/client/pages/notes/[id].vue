<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      <NoteInfoCard
        :note="note"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNoteStore } from '~/stores/note.store'
import type { Note } from '~/models/note.model'

definePageMeta({
  validate: async (route) => {
    // Regular expression for UUID v4
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    // Check if the id is a valid UUID v4
    return typeof route.params.id === 'string' && uuidV4Regex.test(route.params.id)
  },
})

const route = useRoute()
const noteStore = useNoteStore()

const note = ref<Note | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  const result = await noteStore.getNoteById(id)
  if (result) {
    note.value = result
  }
  else {
    throw createError({ statusCode: 404, message: 'Note not found' })
  }
})
</script>
