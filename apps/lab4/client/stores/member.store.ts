import { membersApi } from '~/api/domains/member'
import type { Member } from '~/models/member.model'

export const useMemberStore = defineStore('member', () => {
  const members = ref<Member[]>([])

  const getMembers = async () => {
    console.log('getMembers')
    const result = await membersApi.getMembers()

    if (result) {
      members.value = result
    }

    console.log(members.value)
  }

  return {
    members,
    getMembers,
  }
})
