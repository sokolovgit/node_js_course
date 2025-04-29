export interface PaginatedResult<T> {
  meta: PaginatedResultMeta
  data: T[]
}

export interface PaginatedResultMeta {
  total: number
}
