import { integer, pgTable, json,varchar, timestamp } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    avatarUrl: varchar(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const HistoryTable =  pgTable('historyTable', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recordId: varchar().notNull(),
    content: json(),
    userEmail: varchar('userEmail').references(() => usersTable.email),
    createdAt: varchar(),
    aiAgentType: varchar(),
    metadata: varchar()
})


