export interface Academic {
  faculty: string
  department: string
}
export interface Member {
  path: string
  name: string
  bio: string
  photo?: string
  academic: Academic
  hobbies: string[]
  favoriteQuote: string
}
