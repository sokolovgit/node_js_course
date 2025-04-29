import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  BaseEntity,
} from "typeorm"

export abstract class AbstractIdlessEntity extends BaseEntity {
  @Column({ nullable: true })
  comment: string

  @CreateDateColumn({
    type: "timestamp with time zone",
    name: "created_at",
  })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp with time zone",
    name: "updated_at",
  })
  updatedAt: Date

  @DeleteDateColumn({
    type: "timestamp with time zone",
    name: "deleted_at",
  })
  deletedAt: Date

  @VersionColumn({ default: 0 })
  version: number
}
