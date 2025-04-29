import { PrimaryGeneratedColumn } from "typeorm"
import { AbstractIdlessEntity } from "./abstract-idless.entity"
import { Uuid } from "@/commons/types"

export abstract class AbstractEntity extends AbstractIdlessEntity {
  @PrimaryGeneratedColumn("uuid")
  id: Uuid
}
