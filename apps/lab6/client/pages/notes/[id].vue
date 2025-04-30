<template>
  <div class="min-h-screen p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
      <div v-if="note">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ note.title }}
        </h1>
        <p class="text-gray-700 whitespace-pre-line break-words">
          {{ note.content }}
        </p>
        <router-link
          to="/notes"
        >
          <Button
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Notes
          </Button>
        </router-link>
      </div>
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

const route = useRoute()
const noteStore = useNoteStore()

const note = ref<Note | null>(null)

definePageMeta({
  validate: async (route) => {
    // Regular expression for UUID v4
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    // Check if the id is a valid UUID v4
    return typeof route.params.id === 'string' && uuidV4Regex.test(route.params.id)
  },
})

onMounted(async () => {
  const id = route.params.id as string
  const result = await noteStore.getNoteById(id)
  if (result) {
    note.value = result
  }
})
</script>
