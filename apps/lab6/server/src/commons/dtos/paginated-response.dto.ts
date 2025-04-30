import { ApiProperty } from "@nestjs/swagger"
import { PaginationMetaDto } from "./pagination-meta.dto"
import { PaginatedResult } from "../interfaces/paginated-result.interface"
import { AbstractPaginationDto } from "./abstract-pagination.dto"
import { ClassField } from "../decorators/field.decorators"

export class PaginatedResponseDto<TDataEntry, TDto = TDataEntry> {
  @ApiProperty({ isArray: true })
  readonly data: TDto[]

  @ClassField(() => PaginationMetaDto)
  readonly meta: PaginationMetaDto

  constructor(
    paginatedResult: PaginatedResult<TDataEntry>,
    paginationDto: AbstractPaginationDto,
    dataTransformer?: (entry: TDataEntry) => TDto,
  ) {
    this.data = (
      dataTransformer
        ? paginatedResult.data.map(dataTransformer)
        : paginatedResult.data
    ) as TDto[]
    this.meta = new PaginationMetaDto(paginatedResult.meta, paginationDto)
  }
}
