import * as fs from "fs"
import * as path from "path"
import * as dotenv from "dotenv"

import { Client } from "pg"
import { PG_CONFIG } from "./pg-config"

dotenv.config()

const adminConfig = { ...PG_CONFIG, database: "postgres" }
const client = new Client(adminConfig)

const resetDatabase = async () => {
  try {
    // Connect to the postgres database
    await client.connect()

    // Drop the existing database
    await client.query(`DROP DATABASE IF EXISTS ${PG_CONFIG.database}`)
    console.log(`Database ${PG_CONFIG.database} dropped successfully!`)

    // Create a new database
    await client.query(`CREATE DATABASE ${PG_CONFIG.database}`)
    console.log(`Database ${PG_CONFIG.database} created successfully!`)

    // Close the connection to the postgres database
    await client.end()

    // Reconnect to the newly created database
    const newClient = new Client(PG_CONFIG)
    await newClient.connect()

    // Get all SQL files in the migrations directory
    const migrationsDir = path.resolve(__dirname, "../src/database/migrations")
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))

    // Execute each SQL script
    for (const file of files) {
      const sqlScript = fs.readFileSync(path.join(migrationsDir, file), "utf-8")
      await newClient.query(sqlScript)
      console.log(`Executed ${file} successfully!`)
    }

    console.log("All migrations executed successfully!")
  } catch (err) {
    console.error("Error resetting database:", err)
  } finally {
    // Close the database connection
    await client.end()
  }
}

resetDatabase()
