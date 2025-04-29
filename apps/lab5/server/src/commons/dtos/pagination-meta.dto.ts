import { NumberField, BooleanField } from "../decorators/field.decorators"
import { PaginatedResultMeta } from "../interfaces/paginated-result.interface"
import { AbstractPaginationDto } from "./abstract-pagination.dto"

export class PaginationMetaDto {
  @NumberField()
  readonly page: number

  @NumberField()
  readonly take: number

  @NumberField()
  readonly itemCount: number

  @NumberField()
  readonly pageCount: number

  @BooleanField()
  readonly hasPreviousPage: boolean

  @BooleanField()
  readonly hasNextPage: boolean

  constructor(
    paginatedResultMeta: PaginatedResultMeta,
    paginationDto: AbstractPaginationDto,
  ) {
    this.page = paginationDto.page
    this.take = paginationDto.take

    this.itemCount = paginatedResultMeta.total
    this.pageCount = Math.ceil(this.itemCount / this.take)

    this.hasPreviousPage = paginationDto.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}
