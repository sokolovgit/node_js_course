import { DataSource } from "typeorm"
import { Seeder } from "typeorm-extension"
import { Note } from "../domains/notes/entities/note.entity"

export default class NotesSeeder implements Seeder {
  track = true

  async run(dataSource: DataSource): Promise<any> {
    const notesRepo = dataSource.getRepository(Note)

    const notes = [
      {
        title: "Morning Motivation",
        content:
          "Start your day with a positive mindset. You are capable of amazing things.",
      },
      {
        title: "Meeting Notes - Marketing Strategy",
        content:
          "Discussed Q3 campaigns, influencer partnerships, and budget reallocations.",
      },
      {
        title: "Grocery List",
        content:
          "Eggs, almond milk, spinach, bananas, chicken breast, oats, peanut butter.",
      },
      {
        title: "Book Idea",
        content: "A dystopian world where memories are traded as currency.",
      },
      {
        title: "Workout Routine",
        content:
          "Monday: Chest & Triceps, Tuesday: Back & Biceps, Wednesday: Cardio & Core.",
      },
      {
        title: "Travel Bucket List",
        content: "Iceland, Kyoto, Patagonia, Marrakech, New Zealand, Banff.",
      },
      {
        title: "Favorite Quotes",
        content:
          "“Do not go where the path may lead, go instead where there is no path and leave a trail.” – Emerson",
      },
      {
        title: "Weekly Reflection",
        content:
          "This week I learned to be more patient. Small wins still count.",
      },
      {
        title: "Startup Ideas",
        content:
          "Subscription-based healthy snack service with personalized recommendations.",
      },
      {
        title: "Coding To-Do",
        content:
          "Refactor auth module, add unit tests, and optimize DB queries.",
      },
      {
        title: "Recipe: Avocado Pasta",
        content:
          "Blend avocado, garlic, basil, lemon juice, and olive oil. Toss with pasta.",
      },
      {
        title: "Dream Journal",
        content:
          "Last night I was flying over a glowing forest, chased by laughing shadows.",
      },
      {
        title: "Life Goals",
        content:
          "Build a self-sustaining cabin, write a novel, adopt a rescue dog.",
      },
      {
        title: "Learning Plan",
        content:
          "Finish TypeScript tutorial, enroll in Docker course, build a REST API.",
      },
      {
        title: "Random Thoughts",
        content:
          "What if trees could communicate emotions through color changes?",
      },
      {
        title: "Favorite Podcasts",
        content: "Radiolab, How I Built This, The Daily, Philosophize This!",
      },
      {
        title: "Budget for April",
        content:
          "Rent: $800, Groceries: $250, Savings: $500, Subscriptions: $60.",
      },
      {
        title: "Birthday Gift Ideas",
        content: "Customized journal, tech gadgets, cooking class voucher.",
      },
      {
        title: "Quotes from the Stoics",
        content: "“He who angers you conquers you.” – Elizabeth Kenny",
      },
      {
        title: "Ideas for YouTube Channel",
        content:
          "Dev tutorials, day in the life of a coder, tech book reviews, productivity hacks.",
      },
    ]

    for (const note of notes) {
      await notesRepo.save(note)
    }
  }
}
