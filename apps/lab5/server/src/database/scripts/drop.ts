import { dropDatabase } from "typeorm-extension"
import { config } from "ormconfig"
;(async () => {
  await dropDatabase({
    options: config,
    initialDatabase: "postgres",
  })
})()
