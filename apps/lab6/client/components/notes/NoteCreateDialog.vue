<template>
  <Dialog v-model:open="localIsOpen">
    <DialogContent class="p-6">
      <DialogHeader>
        <DialogTitle>Create New Note</DialogTitle>
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
import { defineProps, ref, computed } from 'vue'
import { z } from 'zod'
import { useNoteStore } from '~/stores/note.store'
import type { CreateNoteDto } from '~/api/dtos/notes/create-note.dto'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['update:isOpen'])

const localIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})

const form = ref<CreateNoteDto>({
  title: '',
  content: '',
})

const noteStore = useNoteStore()

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

const save = async () => {
  const result = noteSchema.safeParse(form.value)
  if (result.success) {
    // Create new note via the store
    await noteStore.createNote({
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
</script>
