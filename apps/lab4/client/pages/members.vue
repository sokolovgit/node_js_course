<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">
      Meet Our Members
    </h1>

    <div class="flex flex-wrap gap-6 items-stretch">
      <MemberCard
        v-for="member in members"
        :key="member.path"
        :member="member"
        class="flex-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MemberCard from '~/components/MemberCard.vue'
import { useMemberStore } from '~/stores/member.store'

const memberStore = useMemberStore()
await memberStore.getMembers()
const members = memberStore.members
</script>

  <style scoped>
  /* Ensure all MemberCard components have the same height */
  .flex-1 {
    display: flex;
    flex-direction: column;
  }
  </style>
