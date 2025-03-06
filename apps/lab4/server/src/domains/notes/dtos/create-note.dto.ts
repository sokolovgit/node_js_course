import { StringField } from "@/commons/decorators/field.decorators"

export class CreateNoteDto {
  @StringField({
    name: "title",
    description: "The title of the note",
  })
  title: string

  @StringField({
    name: "content",
    description: "The content of the note",
  })
  content: string
}
