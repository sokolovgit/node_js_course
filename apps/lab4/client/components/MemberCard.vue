<template>
  <Card class=" bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 max-w-lg">
    <CardContent class="p-6 space-y-4">
      <div class="flex flex-col items-center gap-4">
        <Avatar class="w-32 h-32">
          <AvatarImage
            v-if="member.photo"
            :src="member.photo"
            :alt="member.name"
            class="rounded-full"
          />
          <AvatarFallback class="text-lg font-semibold bg-gray-300 text-gray-800">
            {{ member.name.charAt(0) }}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            {{ member.name }}
          </h2>
          <p class="text-sm text-gray-500">
            {{ member.academic.faculty }} - {{ member.academic.department }}
          </p>
        </div>
      </div>

      <p class="text-sm text-gray-700">
        {{ member.bio }}
      </p>

      <div
        v-if="member.hobbies.length"
        class="mt-2"
      >
        <h3 class="text-sm font-semibold text-gray-700">
          Hobbies:
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="hobby in member.hobbies"
            :key="hobby"
            class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-lg"
          >
            {{ hobby }}
          </span>
        </div>
      </div>

      <blockquote class="text-sm italic text-gray-600 border-l-4 border-blue-400 pl-4">
        "{{ member.favoriteQuote }}"
      </blockquote>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import type { Member } from '~/api/dtos/member.dto'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ member: Member }>()
</script>
