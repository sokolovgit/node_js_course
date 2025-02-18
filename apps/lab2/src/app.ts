import path from 'node:path'
import process from 'node:process'

import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.get('/sokolov', async (req, res) => {
  const photo = await fetchDogImageUrl()

  const student = {
    name: 'Соколов Олександр',
    bio: 'Студент КПІ, працює Backend девелопером. Ненавиджу і люблю пітон.',
    photo,
    academic: {
      faculty: 'Факультет інформатики та обчислювальної техніки',
      department: 'Кафедра інформатики та програмної інженерії',
    },
    hobbies: ['Код', 'Катання на велосипеді', 'Фотографія', 'Спортзал'],
    favoriteQuote: 'Півка би бахнуть...',
  }

  res.render('student', { student, title: 'Інформація про студента' })
})

app.get('/tkachenko', async (req, res) => {
  const photo = await fetchDogImageUrl()

  const student = {
    name: 'Ткаченко Руслан',
    bio: 'Студент КПІ, працює фулл стек девелопером. Дот НЕТ енджоєр.',
    photo,
    academic: {
      faculty: 'Факультет інформатики та обчислювальної техніки',
      department: 'Кафедра інформатики та програмної інженерії',
    },
    hobbies: ['Кодування', 'Мандрівки', 'Гра на гітарі', 'Рибалка'],
    favoriteQuote: 'По нуль пять?)',
  }

  res.render('student', { student, title: 'Інформація про студента' })
})

app.get('/khmil', async (req, res) => {
  const photo = await fetchDogImageUrl()

  const student = {
    name: 'Хміль Владислав',
    bio: 'Студент КПІ, захоплюється веб-розробкою та дизайном інтерфейсів.',
    photo,
    academic: {
      faculty: 'Факультет інформатики та обчислювальної техніки',
      department: 'Кафедра інформатики та програмної інженерії',
    },
    hobbies: ['Кодування', 'Мандрівки', 'Бодібілдинг', 'Музика'],
    favoriteQuote: 'All I can say is that I have taken more out of alcohol than alcohol has taken out of me.',
  }

  res.render('student', { student, title: 'Інформація про студента' })
})

app.get('/vladarchuk', async (req, res) => {
  const photo = await fetchDogImageUrl()

  const student = {
    name: 'Владарчук Роман',
    bio: 'Студент КПІ, захоплюється веб-розробкою та дизайном інтерфейсів.',
    photo,
    academic: {
      faculty: 'Факультет інформатики та обчислювальної техніки',
      department: 'Кафедра інформатики та програмної інженерії',
    },
    hobbies: ['Спортзал', 'Мандрівки', 'Біг', 'Фільми'],
    favoriteQuote: 'Тараньку знаєш? Я протаранив.',
  }

  res.render('student', { student, title: 'Інформація про студента' })
})

app.get('/lomakin', async (req, res) => {
  const photo = await fetchDogImageUrl()

  const student = {
    name: 'Ломакін Максим',
    bio: 'Студент комп’ютерних наук, захоплюється веб-розробкою, штучним інтелектом та дизайном інтерфейсів.',
    photo,
    academic: {
      faculty: 'Факультет інформаційних технологій',
      department: 'Веб-розробка',
    },
    hobbies: ['Кодування', 'Мандрівки', 'Фотографія', 'Читання'],
    favoriteQuote: 'Код — це поезія для машини.',
  }

  res.render('student', { student, title: 'Інформація про студента' })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`)
})

async function fetchDogImageUrl(): Promise<string> {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    return data.message
  }
  catch (error) {
    console.error(error)
    return ''
  }
}
