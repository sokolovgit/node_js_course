import { StringField } from "@/commons/decorators/field.decorators"

export interface Academic {
  faculty: string
  department: string
}

export class AcademicDto {
  @StringField({
    name: "faculty",
    description: "Faculty",
    example: "Computer Science",
  })
  faculty: string

  @StringField({
    name: "department",
    description: "Department",
    example: "Software Engineering",
  })
  department: string

  constructor(academic: Academic) {
    this.faculty = academic.faculty
    this.department = academic.department
  }
}
