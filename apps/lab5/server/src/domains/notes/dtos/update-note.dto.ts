import { StringFieldOptional } from "@/commons/decorators/field.decorators"

export class UpdateNoteDto {
  @StringFieldOptional({
    name: "title",
    description: "The title of the note",
    maxLength: 255,
  })
  title?: string

  @StringFieldOptional({
    name: "content",
    description: "The content of the note",
  })
  content?: string
}
