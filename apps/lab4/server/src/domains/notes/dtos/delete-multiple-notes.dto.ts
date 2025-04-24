import { ApiProperty } from "@nestjs/swagger"
import { IsArray, ArrayNotEmpty, ArrayUnique, IsUUID } from "class-validator"

export class DeleteMultipleNotesDto {
  @IsArray()
  @IsUUID("4", { each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @ApiProperty({
    example: ["uuid1", "uuid2"],
    description: "Array of note ids",
  })
  ids: Uuid[]
}
