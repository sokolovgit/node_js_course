import { injectable } from 'inversify'
import type { Member } from '../entities/member.entity'

@injectable()
export class MembersRepository {
  private members: Member[] = [
    {
      path: 'sokolov',
      name: 'Соколов Олександр',
      bio: 'Студент КПІ, працює Backend девелопером. Ненавиджу і люблю пітон.',

      academic: {
        faculty: 'Факультет інформатики та обчислювальної техніки',
        department: 'Кафедра інформатики та програмної інженерії',
      },

      hobbies: ['Код', 'Катання на велосипеді', 'Фотографія', 'Спортзал'],
      favoriteQuote: 'Півка би бахнуть...',
    },
    {
      path: 'tkachenko',
      name: 'Ткаченко Руслан',
      bio: 'Студент КПІ, працює фулл стек девелопером. Дот НЕТ енджоєр.',

      academic: {
        faculty: 'Факультет інформатики та обчислювальної техніки',
        department: 'Кафедра інформатики та програмної інженерії',
      },

      hobbies: ['Кодування', 'Мандрівки', 'Гра на гітарі', 'Рибалка'],
      favoriteQuote: 'По нуль пять?)',
    },
    {
      path: 'khmil',
      name: 'Хміль Владислав',
      bio: 'Студент КПІ, захоплюється веб-розробкою та дизайном інтерфейсів.',

      academic: {
        faculty: 'Факультет інформатики та обчислювальної техніки',
        department: 'Кафедра інформатики та програмної інженерії',
      },

      hobbies: ['Кодування', 'Мандрівки', 'Бодібілдинг', 'Музика'],
      favoriteQuote: 'All I can say is that I have taken more out of alcohol than alcohol has taken out of me.',
    },
    {
      path: 'vladarchuk',
      name: 'Владарчук Роман',
      bio: 'Студент КПІ, захоплюється веб-розробкою та дизайном інтерфейсів.',

      academic: {
        faculty: 'Факультет інформатики та обчислювальної техніки',
        department: 'Кафедра інформатики та програмної інженерії',
      },
      hobbies: ['Спортзал', 'Мандрівки', 'Біг', 'Фільми'],
      favoriteQuote: 'Тараньку знаєш? Я протаранив.',
    },
    {
      path: 'lomakin',
      name: 'Ломакін Максим',
      bio: 'Студент комп’ютерних наук, захоплюється веб-розробкою, штучним інтелектом та дизайном інтерфейсів.',

      academic: {
        faculty: 'Факультет інформаційних технологій',
        department: 'Веб-розробка',
      },

      hobbies: ['Кодування', 'Мандрівки', 'Фотографія', 'Читання'],
      favoriteQuote: 'Код — це поезія для машини.',
    },
  ]

  async getMemberByPath(path: string) {
    const member = this.members.find(member => member.path === path)

    return member
  }
}
