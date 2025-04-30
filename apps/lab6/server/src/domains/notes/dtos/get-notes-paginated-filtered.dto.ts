import { AbstractPaginationDto } from "@/commons"
import { StringFieldOptional } from "@/commons/decorators/field.decorators"
import { NotesFilterOptions } from "../interfaces/notes-filter-options.interface"

export class GetNotesPaginatedAndFilteredDto extends AbstractPaginationDto {
  @StringFieldOptional({
    description: "Filter by title",
    example: "My note",
  })
  title?: string

  get filterOptions(): NotesFilterOptions {
    return {
      title: this.title,
    }
  }
}
