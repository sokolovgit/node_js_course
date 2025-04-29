import { createDatabase, dropDatabase, runSeeders } from "typeorm-extension"
import dataSource, { config } from "ormconfig"
;(async () => {
  await dropDatabase({
    options: config,
    initialDatabase: "postgres",
  })
  await createDatabase({
    options: config,
    initialDatabase: "postgres",
  })

  await dataSource.initialize()
  await dataSource.runMigrations({
    transaction: "all",
  })
  await runSeeders(dataSource, { seedTracking: true })

  await dataSource.destroy()
})()
