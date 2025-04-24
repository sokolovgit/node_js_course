import apiClient from '../api'

import type { Member } from '../../models/member.model'

export const membersApi = {
  getMembers: async (): Promise<Member[]> => {
    const result = await apiClient.get('/members')

    if (!result.ok) {
      throw new Error('Failed to fetch members')
    }

    return result.body
  },
}
