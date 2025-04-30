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

      <div class="flex justify-end gap-2 flex-wrap">
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
        <Button
          class="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          @click="copyToClipboard"
        >
          Share
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Note } from '~/models/note.model'
import { useToast } from '@/components/ui/toast'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits(['edit', 'delete', 'select'])

const selected = ref(false)
const { toast } = useToast()

const toggleSelection = () => {
  emit('select', { note: props.note, selected: selected.value })
}

const copyToClipboard = async () => {
  const url = `${window.location.origin}/notes/${props.note.id}`
  try {
    await navigator.clipboard.writeText(url)
    toast({
      title: 'Copied!',
      description: 'Note URL has been copied to clipboard.',
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to copy URL to clipboard.',
      variant: 'destructive',
    })
  }
}
</script>
