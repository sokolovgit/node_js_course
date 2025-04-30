import { Expose } from "class-transformer"
import { PaginationOptions } from "../interfaces/pagination-options.interface"
import { ToInt } from "../decorators/transform.decorators"
import {
  NumberField,
  NumberFieldOptional,
} from "../decorators/field.decorators"

export class AbstractPaginationDto {
  @NumberField()
  @ToInt()
  @Expose()
  page: number

  @NumberFieldOptional({ default: 10 })
  @ToInt()
  @Expose()
  take = 10

  get skip() {
    return (this.page - 1) * this.take
  }

  get paginationOptions(): PaginationOptions {
    return {
      skip: this.skip,
      take: this.take,
    }
  }
}
