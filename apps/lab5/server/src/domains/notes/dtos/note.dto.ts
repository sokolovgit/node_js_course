import { Uuid } from "@/commons"
import { StringField, UUIDField } from "@/commons/decorators/field.decorators"
import { Note } from "@/database/domains/notes/entities/note.entity"

export class NoteDto {
  @UUIDField({
    name: "id",
    description: "The unique identifier of the note",
  })
  id: Uuid

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

  constructor(note: Note) {
    this.id = note.id
    this.title = note.title
    this.content = note.content
  }
}
