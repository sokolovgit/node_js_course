import * as dotenv from "dotenv"

dotenv.config()

const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} is not set`)
  }
  return value
}

export const PG_CONFIG = {
  host: getEnvVar("DB_HOST"),
  user: getEnvVar("DB_USERNAME"),
  password: getEnvVar("DB_PASSWORD"),
  database: getEnvVar("DB_NAME"),
}
