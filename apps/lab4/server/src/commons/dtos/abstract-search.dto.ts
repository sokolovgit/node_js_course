import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, ValidateIf } from 'class-validator'
import { AbstractPaginationDto } from './abstract-pagination.dto'

export class AbstractSearchDto extends AbstractPaginationDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  q?: string | null
}
