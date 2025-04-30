import { Module } from "@nestjs/common"
import { NotesController } from "./notes.controller"
import { NotesService } from "./notes.service"

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [],
})
export class NotesModule {}
