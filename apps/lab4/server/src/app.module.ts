import config from "./config/config"

import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { DatabaseModule } from "./database/database.module"
import { NotesDomainModule } from "./database/domains/notes/notes.domain-module"
import { MembersDomainModule } from "./database/domains/members/members.domain-module"
import { MembersModule } from "./domains/members/members.module"
import { NotesModule } from "./domains/notes/notes.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    NotesDomainModule,
    NotesModule,
    MembersDomainModule,
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
