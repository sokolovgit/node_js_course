import * as fs from "fs"
import * as path from "path"

import { Client } from "pg"
import { PG_CONFIG } from "./pg-config"

// Configure your database connection settings
const client = new Client(PG_CONFIG)

const runScripts = async () => {
  try {
    // Connect to the database
    await client.connect()

    // Get all SQL files in the migrations directory
    const migrationsDir = path.resolve(__dirname, "../src/database/migrations")
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))

    // Execute each SQL script
    for (const file of files) {
      const sqlScript = fs.readFileSync(path.join(migrationsDir, file), "utf-8")
      await client.query(sqlScript)
      console.log(`Executed ${file} successfully!`)
    }

    console.log("All migrations executed successfully!")
  } catch (err) {
    console.error("Error executing script:", err)
  } finally {
    // Close the database connection
    await client.end()
  }
}

runScripts()
