import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(),
  email: varchar().notNull().unique(),
  name: varchar().notNull(),
  imageUrl: varchar().notNull(),
  createdAt,
  updatedAt,
});

// Many defines one-to-many relations
// For understanding relations at the application level
export const UserRelations = relations(UserTable, ({ many }) => ({
  jobInfos: many(JobInfoTable),
}));
