import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL, // use environment variables for the base URL
  headers: {
    'Content-Type': 'application/json',
  },
})
