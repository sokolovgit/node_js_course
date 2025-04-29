/* eslint-disable no-console */
const childProcess = require('child_process')
const path = require('path')
const fs = require('fs')

const projectWorkingDirectory = path.resolve(__dirname, '..')
const ormconfigPath = path.resolve(projectWorkingDirectory, 'ormconfig.ts')
const migrationsPath = path.resolve(
  projectWorkingDirectory,
  'src/database/migrations'
)

if (!process.argv[2]) {
  console.error('Argument is required to generate migration')
  process.exit(1)
}

const migrationName = process.argv[2]

const $ = (command) => {
  console.log('Executing command:', command)
  const result = childProcess.execSync(command, {
    encoding: 'utf-8',
    cwd: projectWorkingDirectory,
  })
  console.log(result)
}

const migrationExists = (name) => {
  const files = fs.readdirSync(migrationsPath)
  return files.some((file) => file.includes(name))
}

if (migrationExists(migrationName)) {
  console.log(`Migration with the name "${migrationName}" already exists.`)
} else {
  $(
    `pnpm ts-node ./node_modules/typeorm/cli.js migration:generate ./src/database/migrations/${migrationName} -d ${ormconfigPath} -p`
  )
  $('pnpm db:migration:format')
}
