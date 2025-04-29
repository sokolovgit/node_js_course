import { Uuid } from "@/commons"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("member")
export class Member {
  @PrimaryGeneratedColumn("uuid")
  id: Uuid

  @Column()
  path: string

  @Column()
  name: string

  @Column("text")
  bio: string

  @Column({ nullable: true })
  photo?: string

  @Column({
    name: 'academic_faculty',
  })
  academicFaculty: string

  @Column({
    name: 'academic_department',
  })
  academicDepartment: string

  @Column("text", { array: true })
  hobbies: string[]

  @Column("text", {
    name: 'favorite_quote',
  })
  favoriteQuote: string
}
