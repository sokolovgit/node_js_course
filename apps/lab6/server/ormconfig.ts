import { DataSource, DataSourceOptions } from "typeorm"
import { configDotenv } from "dotenv"
import * as path from "path"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

configDotenv()

export const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    path.resolve(__dirname, "src/database/domains/**/*.entity.{js,ts}"),
  ],
  migrations: [path.resolve(__dirname, "src/database/migrations/*.{js,ts}")],
  namingStrategy: new SnakeNamingStrategy(),
}

export default new DataSource(config)
