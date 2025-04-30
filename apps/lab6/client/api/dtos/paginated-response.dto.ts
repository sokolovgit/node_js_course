export interface PaginatedResponseMeta {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface PaginatedResponseDto<T> {
  meta: PaginatedResponseMeta
  data: T[]
}
