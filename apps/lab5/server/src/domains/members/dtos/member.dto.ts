import { ClassField, StringField } from "@/commons/decorators/field.decorators"
import { Member } from "@/database/domains/members/interfaces/member.interface"
import { AcademicDto } from "./academic.dto"

export class MemberDto {
  @StringField({
    name: "path",
    description: "Path",
    example: "sokolov",
  })
  path: string

  @StringField({
    name: "name",
    description: "Name",
    example: "Oleksandr Sokolov",
  })
  name: string

  @StringField({
    name: "bio",
    description: "Bio",
    example: "I am a software engineer",
  })
  bio: string

  @StringField({
    name: "photo",
    description: "Photo",
    example: "https://example.com/photo.jpg",
  })
  photo?: string

  @ClassField(() => AcademicDto, {
    name: "academic",
    description: "Academic",
  })
  academic: AcademicDto

  @StringField({
    name: "hobbies",
    description: "Hobbies",
    isArray: true,
    example: ["reading", "swimming"],
  })
  hobbies: string[]

  @StringField({
    name: "favoriteQuote",
    description: "Favorite quote",
    example: "To be or not to be",
  })
  favoriteQuote: string

  constructor(member: Member) {
    this.path = member.path
    this.name = member.name
    this.bio = member.bio
    this.photo = member.photo
    this.academic = new AcademicDto(member.academic)
    this.hobbies = member.hobbies
    this.favoriteQuote = member.favoriteQuote
  }
}
