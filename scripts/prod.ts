import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Italiano", imageSrc: "/it.svg" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unidad 1",
            description: `Aprende básico ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unidad 2",
            description: `Aprende intermedio ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '¿Cual de estos es "el hombre"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '¿Cual de estos es "la mujer"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '¿Cual de estos es "el chico"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"El hombre"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '¿Cual de estos es "el zombi"',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '¿Cual de estos es "el robot"',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: '¿Cual de estos es "la chica"',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"el zombi"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "il uomo",
                  imageSrc: "/man.svg",
                  audioSrc: "/it_hombre.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la donna",
                  imageSrc: "/woman.svg",
                  audioSrc: "/it_mujer.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il ragazzo",
                  imageSrc: "/boy.svg",
                  audioSrc: "/it_chico.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la donna",
                  imageSrc: "/woman.svg",
                  audioSrc: "/it_mujer.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il ragazzo",
                  imageSrc: "/boy.svg",
                  audioSrc: "/it_chico.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il uomo",
                  imageSrc: "/man.svg",
                  audioSrc: "/it_hombre.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la donna",
                  imageSrc: "/woman.svg",
                  audioSrc: "/it_mujer.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il uomo",
                  imageSrc: "/man.svg",
                  audioSrc: "/it_hombre.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "il ragazzo",
                  imageSrc: "/boy.svg",
                  audioSrc: "/it_chico.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la donna",
                  audioSrc: "/it_mujer.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "il uomo",
                  audioSrc: "/it_hombre.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il ragazzo",
                  audioSrc: "/it_chico.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il uomo",
                  imageSrc: "/man.svg",
                  audioSrc: "/it_hombre.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la donna",
                  imageSrc: "/woman.svg",
                  audioSrc: "/it_mujer.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "lo zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/it_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "il robot",
                  imageSrc: "/robot.svg",
                  audioSrc: "/it_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "lo zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/it_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il ragazzo",
                  imageSrc: "/boy.svg",
                  audioSrc: "/it_chico.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la ragazza",
                  imageSrc: "/girl.svg",
                  audioSrc: "/it_chica.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "lo zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/it_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il uomo",
                  imageSrc: "/man.svg",
                  audioSrc: "/it_hombre.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la donna",
                  audioSrc: "/it_mujer.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "lo zombie",
                  audioSrc: "/it_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "il ragazzo",
                  audioSrc: "/it_chico.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
