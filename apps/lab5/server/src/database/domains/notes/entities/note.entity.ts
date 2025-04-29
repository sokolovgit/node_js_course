
import { Uuid } from "@/commons"
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"


@Entity("note")
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: Uuid

  @Column()
  title: string

  @Column("text")
  content: string

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date
}
