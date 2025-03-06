import { Global, Module } from "@nestjs/common"
import { NotesRepository } from "./repositories/notes.repository"

@Global()
@Module({
  providers: [NotesRepository],
  exports: [NotesRepository],
})
export class NotesDomainModule {}
