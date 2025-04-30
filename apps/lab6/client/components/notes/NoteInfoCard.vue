<template>
  <div class="note-card bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 mb-1">
      {{ note.title }}
    </h2>
    <p class="text-gray-600 whitespace-pre-line break-words">
      {{ note.content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/models/note.model'

defineProps<{
  note: Note
}>()
</script>
