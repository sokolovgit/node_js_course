<template>
  <div class="note-card p-4 border rounded shadow-md">
    <input
      v-model="selected"
      type="checkbox"
      class="mr-2"
      @change="toggleSelection"
    >
    <div>
      <h2 class="font-semibold">
        {{ note.title }}
      </h2>
      <p>{{ note.content }}</p>
    </div>
    <Button @click="$emit('edit', note)">
      Edit
    </Button>
    <Button @click="$emit('delete', note.id)">
      Delete
    </Button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import type { Note } from '~/models/note.model'

const props = defineProps({
  note: {
    type: Object as () => Note,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete', 'select'])

const selected = ref(false)

const toggleSelection = () => {
  emit('select', { note: props.note, selected: selected.value })
}
</script>
