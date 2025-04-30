<template>
  <div class="note-card bg-white border border-gray-200 rounded-xl shadow-sm p-4 relative hover:shadow-lg transition-all duration-200 w-full">
    <div class="absolute top-4 left-4">
      <input
        v-model="selected"
        type="checkbox"
        class="accent-blue-600 w-4 h-4"
        @change="toggleSelection"
      >
    </div>

    <div class="pl-8">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">
        {{ note.title }}
      </h2>
      <p class="text-gray-600 mb-4 whitespace-pre-line break-words">
        {{ note.content }}
      </p>

      <div class="flex justify-end gap-2">
        <Button
          class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="$emit('edit', note)"
        >
          Edit
        </Button>
        <Button
          class="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          @click="$emit('delete', note.id)"
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Note } from '~/models/note.model'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits(['edit', 'delete', 'select'])

const selected = ref(false)

const toggleSelection = () => {
  emit('select', { note: props.note, selected: selected.value })
}
</script>
