import { PG_CONNECTION } from "@/сonstant/pg-connection"
import { Module, Global } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Pool } from "pg"

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PG_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get("DB_USERNAME"),
          host: configService.get("DB_HOST"),
          database: configService.get("DB_NAME"),
          password: configService.get("DB_PASSWORD"),
          port: configService.get("DB_PORT"),
        })

        return pool
      },
      inject: [ConfigService],
    },
  ],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}
