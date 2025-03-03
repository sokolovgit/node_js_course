import path from 'node:path'
import process from 'node:process'

import dotenv from 'dotenv'
import express from 'express'

import bodyParser from 'body-parser'

import { container } from './constant/config'

import { InversifyExpressServer } from 'inversify-express-utils'

import './domains/notes/notes.controller'
import './domains/members/members.controller'

dotenv.config()

const app = new InversifyExpressServer(container)

const PORT = process.env.PORT || 3000

app.setConfig((app) => {
  // app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))

  app.use(express.static(path.join(__dirname, '..', 'public')))
})

const server = app.build()
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`)
})
