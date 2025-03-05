import { Module, Global } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Pool } from "pg"

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "PG_CONNECTION",
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get("DB_USER"),
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
  exports: ["PG_CONNECTION"],
})
export class DatabaseModule {}
