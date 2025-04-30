import { createDatabase } from "typeorm-extension"
import { config } from "ormconfig"
;(async () => {
  await createDatabase({
    options: config,
    initialDatabase: "postgres",
  })
})()
