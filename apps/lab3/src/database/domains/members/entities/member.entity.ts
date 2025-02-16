export interface Member {
  path: string
  name: string
  bio: string
  photo?: string
  academic: {
    faculty: string
    department: string
  }
  hobbies: string[]
  favoriteQuote: string
}
