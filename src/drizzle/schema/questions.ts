import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";
import { uuid } from "drizzle-orm/pg-core";

export const questionDifficulties = ["easy", "medium", "hard"] as const;
export type QuestionDifficulty = (typeof questionDifficulties)[number];

export const questionDifficultyEnum = pgEnum(
  "questions_question_difficulty",
  questionDifficulties
);

export const QuestionTable = pgTable("questions", {
  id,
  // For relation establishment at the data base level
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  text: varchar().notNull(),
  difficultyLevel: questionDifficultyEnum().notNull(),
  createdAt,
  updatedAt,
});

// one defines one-to-one to many-to-one relation.
// For understanding relations at the application level.
export const questionsRelations = relations(QuestionTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [QuestionTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));
