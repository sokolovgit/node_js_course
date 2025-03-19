<template>
  <Dialog v-model:open="localIsOpen">
    <DialogContent class="p-6">
      <DialogHeader>
        <DialogTitle>Edit Note</DialogTitle>
      </DialogHeader>
      <div class="space-y-4">
        <Input
          v-model="form.title"
          placeholder="Title"
        />
        <Textarea
          v-model="form.content"
          placeholder="Content"
        />
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          @click="close"
        >
          Cancel
        </Button>
        <Button @click="save">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch } from 'vue'
import { z } from 'zod'
import { useNoteStore } from '~/stores/note.store'

const props = defineProps({
  isOpen: Boolean,
  note: {
    type: Object as () => { title: string, content: string, id: string },
    required: true,
  },
})

const emit = defineEmits(['update:isOpen'])

const localIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})

const form = ref({
  title: '',
  content: '',
  id: '',
})

const noteStore = useNoteStore()

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
})

const save = async () => {
  const result = noteSchema.safeParse(form.value)
  if (result.success) {
    // Directly update the note in the store
    await noteStore.updateNoteById(form.value.id, {
      title: form.value.title,
      content: form.value.content,
    })
    close()
  }
  else {
    console.error(result.error.errors)
  }
}

const close = () => {
  emit('update:isOpen', false)
}

// Watch for changes in the note prop to update the form
watch(() => props.note, (newNote) => {
  form.value = { ...newNote }
}, { immediate: true })
</script>
