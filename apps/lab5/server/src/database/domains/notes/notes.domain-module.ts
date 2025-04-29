import { Global, Module } from "@nestjs/common"
import { NotesRepository } from "./repositories/notes.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Note } from "./entities/note.entity"

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesRepository],
  exports: [NotesRepository],
})
export class NotesDomainModule {}
