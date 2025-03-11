import type { Member } from '../dtos/member.dto'
// import { apiClient } from "../api";

export const membersApi = {
  getMembers: async (): Promise<Member[]> => {
    const response = await fetch(`http://localhost:3000/members`)

    if (!response.ok) {
      throw new Error('Failed to fetch members')
    }

    console.log('api success')
    return await response.json()
  },
}
