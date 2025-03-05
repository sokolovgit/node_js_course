import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { Logger } from "@nestjs/common"

async function bootstrap() {
  const logger = new Logger()

  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle("Learning Management System API")
    .setDescription("The Learning Management System API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("swagger", app, document)

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
  await app.listen(port, "0.0.0.0")

  logger.log(`Application is running on: ${await app.getUrl()}`)
  logger.log(`Swagger is running on: ${await app.getUrl()}/swagger`)
}

bootstrap()
