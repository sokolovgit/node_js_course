<template>
  <div class="member-card border p-4 rounded-md shadow-md hover:shadow-lg">
    <div class="flex items-center">
      <img
        v-if="member.photo"
        :src="member.photo"
        alt="Member photo"
        class="w-16 h-16 rounded-full mr-4"
      >
      <div>
        <h2 class="text-xl font-bold">
          {{ member.name }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ member.academic.faculty }} - {{ member.academic.department }}
        </p>
      </div>
    </div>

    <p class="mt-2 text-sm">
      {{ member.bio }}
    </p>

    <div
      v-if="member.hobbies.length"
      class="mt-2"
    >
      <h3 class="font-semibold text-gray-700">
        Hobbies:
      </h3>
      <ul class="list-disc pl-5 text-sm">
        <li
          v-for="hobby in member.hobbies"
          :key="hobby"
        >
          {{ hobby }}
        </li>
      </ul>
    </div>

    <blockquote class="mt-2 text-sm italic text-gray-600">
      "{{ member.favoriteQuote }}"
    </blockquote>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Member } from '~/api/dtos/member.dto'

const props = defineProps<{ member: Member }>()

console.log('member in MemberCard.vue', props.member)
</script>

<style scoped>
  .member-card {
    max-width: 300px;
    width: 100%;
  }

  .member-card img {
    object-fit: cover;
  }
</style>
