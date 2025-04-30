import {
  Get,
  Body,
  Post,
  Param,
  Query,
  Patch,
  Delete,
  Controller,
  ParseUUIDPipe,
  ValidationPipe,
} from "@nestjs/common"
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
} from "@nestjs/swagger"

import { NotesService } from "./notes.service"

import { PaginatedResponseDto } from "@/commons/dtos/paginated-response.dto"
import { AbstractPaginationDto, Uuid } from "@/commons"

import { NoteDto } from "./dtos/note.dto"
import { CreateNoteDto } from "./dtos/create-note.dto"
import { UpdateNoteDto } from "./dtos/update-note.dto"
import { DeleteMultipleNotesDto } from "./dtos/delete-multiple-notes.dto"

@Controller("notes")
@ApiTags("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ summary: "Get all notes. Paginated" })
  @ApiOkResponse({
    type: PaginatedResponseDto<NoteDto>,
    description: "All notes were successfully retrieved",
  })
  async getNotesPaginated(
    @Query(new ValidationPipe({ transform: true }))
    getNotesDto: AbstractPaginationDto,
  ) {
    const result = await this.notesService.getNotesPaginated(getNotesDto)

    return new PaginatedResponseDto(
      result,
      getNotesDto,
      (note) => new NoteDto(note),
    )
  }

  @Post()
  @ApiOperation({ summary: "Create a new note" })
  @ApiOkResponse({
    type: NoteDto,
    description: "The note was successfully created",
  })
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    const note = await this.notesService.createNote({
      title: createNoteDto.title,
      content: createNoteDto.content,
    })

    return new NoteDto(note)
  }

  @Delete("multiple")
  @ApiOperation({ summary: "Delete multiple notes by ids" })
  @ApiBody({
    type: DeleteMultipleNotesDto,
    description: "The ids of the notes to delete",
  })
  @ApiOkResponse({
    description: "The notes were successfully deleted",
    example: {
      message: "The notes were successfully deleted",
    },
  })
  @ApiNotFoundResponse({
    description: "The notes with the specified ids were not found",
  })
  async deleteNotesByIds(@Body() body: DeleteMultipleNotesDto) {
    console.log(body)

    await this.notesService.deleteNotesByIds(body.ids)

    return {
      message: "The notes were successfully deleted",
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a note by id" })
  @ApiOkResponse({
    type: NoteDto,
    description: "The note was successfully retrieved",
  })
  @ApiNotFoundResponse({
    description: "The note with the specified id was not found",
  })
  async getNoteById(@Param("id", ParseUUIDPipe) id: Uuid) {
    const note = await this.notesService.getNoteById(id)

    return new NoteDto(note)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a note by id" })
  @ApiOkResponse({
    description: "The note was successfully deleted",
    example: {
      message: "The note was successfully deleted",
    },
  })
  @ApiNotFoundResponse({
    description: "The note with the specified id was not found",
  })
  async deleteNoteById(@Param("id", ParseUUIDPipe) id: Uuid) {
    await this.notesService.deleteNoteById(id)

    return {
      message: "The note was successfully deleted",
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a note by id" })
  @ApiOkResponse({
    type: NoteDto,
    description: "The note was successfully updated",
  })
  @ApiNotFoundResponse({
    description: "The note with the specified id was not found",
  })
  async updateNoteById(
    @Param("id", ParseUUIDPipe) id: Uuid,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const note = await this.notesService.updateNoteById(id, {
      title: updateNoteDto.title,
      content: updateNoteDto.content,
    })

    return new NoteDto(note)
  }
}
