import { DataSource } from "typeorm"
import { Seeder } from "typeorm-extension"
import { Member } from "../domains/members/entities/member.entity"

export default class MembersSeeder implements Seeder {
  track = true

  async run(dataSource: DataSource): Promise<any> {
    const membersRepo = dataSource.getRepository(Member)

    const members = [
      {
        path: "sokolov",
        name: "Соколов Олександр",
        bio: "Студент КПІ, працює Backend девелопером. Ненавиджу і люблю пітон.",
        academicFaculty: "Факультет інформатики та обчислювальної техніки",
        academicDepartment: "Кафедра інформатики та програмної інженерії",
        hobbies: ["Код", "Катання на велосипеді", "Фотографія", "Спортзал"],
        favoriteQuote: "Півка би бахнуть...",
      },
      {
        path: "tkachenko",
        name: "Ткаченко Руслан",
        bio: "Студент КПІ, працює фулл стек девелопером. Дот НЕТ енджоєр.",
        academicFaculty: "Факультет інформатики та обчислювальної техніки",
        academicDepartment: "Кафедра інформатики та програмної інженерії",
        hobbies: ["Кодування", "Мандрівки", "Гра на гітарі", "Рибалка"],
        favoriteQuote: "По нуль пять?)",
      },
      {
        path: "khmil",
        name: "Хміль Владислав",
        bio: "Студент КПІ, захоплюється веб-розробкою та дизайном інтерфейсів.",
        academicFaculty: "Факультет інформатики та обчислювальної техніки",
        academicDepartment: "Кафедра інформатики та програмної інженерії",
        hobbies: ["Кодування", "Мандрівки", "Бодібілдинг", "Музика"],
        favoriteQuote:
          "All I can say is that I have taken more out of alcohol than alcohol has taken out of me.",
      },
      {
        path: "vladarchuk",
        name: "Владарчук Роман",
        bio: "Студент КПІ, захоплюється веб-розробкою та дизайном інтерфейсів.",
        academicFaculty: "Факультет інформатики та обчислювальної техніки",
        academicDepartment: "Кафедра інформатики та програмної інженерії",
        hobbies: ["Спортзал", "Мандрівки", "Біг", "Фільми"],
        favoriteQuote: "Тараньку знаєш? Я протаранив.",
      },
      {
        path: "lomakin",
        name: "Ломакін Максим",
        bio: "Студент комп’ютерних наук, захоплюється веб-розробкою, штучним інтелектом та дизайном інтерфейсів.",
        academicFaculty: "Факультет інформаційних технологій",
        academicDepartment: "Веб-розробка",
        hobbies: ["Кодування", "Мандрівки", "Фотографія", "Читання"],
        favoriteQuote: "Код — це поезія для машини.",
      },
    ]

    for (const member of members) {
      await membersRepo.save(member)
    }
  }
}
