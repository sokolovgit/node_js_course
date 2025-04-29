import config from "./config/config"

import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MembersModule } from "./domains/members/members.module"
import { NotesModule } from "./domains/notes/notes.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import * as path from "path"
import { NotesDomainModule } from "./database/domains/notes/notes.domain-module"
import { MembersDomainModule } from "./database/domains/members/members.domain-module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [
          path.resolve(__dirname, "database/domains/**/*.entity.{js,ts}"),
        ],
        migrations: [path.resolve(__dirname, "database/migrations/*.{js,ts}")],
        migrationsRun: false,
        logging: true,
        synchronize: true,
      }),
    }),

    NotesDomainModule,
    NotesModule,
    MembersDomainModule,
    MembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
