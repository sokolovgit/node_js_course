import type { PaginationDto } from '../pagination.dto'

export interface GetNotesPaginatedAndFilteredDto extends PaginationDto {
  title?: string
}
