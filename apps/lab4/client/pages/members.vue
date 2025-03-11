<template>
  <div class="members-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <MemberCard
      v-for="member in members"
      :key="member.path"
      :member="member"
    />
  </div>
</template>

<script setup lang="ts">
import MemberCard from '~/components/MemberCard.vue'
import { useMemberStore } from '~/stores/member.store'

const memberStore = useMemberStore()

await memberStore.getMembers()

console.log('members in members.vue', memberStore.members)

const members = memberStore.members
</script>
