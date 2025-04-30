<template>
  <Pagination
    :items-per-page="itemsPerPage"
    :total="total"
    :sibling-count="1"
    show-edges
    :default-page="currentPage"
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1"
    >
      <!-- First Page Button -->
      <PaginationFirst @click="changePage(1)" />

      <!-- Previous Page Button -->
      <PaginationPrev
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      />

      <!-- Page Number Buttons -->
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="item.value"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === currentPage ? 'default' : 'outline'"
            @click="changePage(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <!-- Ellipsis for gap between pages -->
        <PaginationEllipsis v-else />
      </template>

      <!-- Next Page Button -->
      <PaginationNext
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      />

      <!-- Last Page Button -->
      <PaginationLast @click="changePage(totalPages)" />
    </PaginationList>
  </Pagination>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue'
import {
  Button,
} from '@/components/ui/button'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:currentPage'])

const totalPages = ref(Math.ceil(props.total / props.itemsPerPage))

// Watch total pages in case the total or itemsPerPage changes
watch([() => props.total, () => props.itemsPerPage], () => {
  totalPages.value = Math.ceil(props.total / props.itemsPerPage)
}, { immediate: true })

const changePage = (newPage: number) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    emit('update:currentPage', newPage)
  }
}
</script>
