import { drizzle } from 'drizzle-orm/vercel-postgres';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import type { AdapterAccount } from '@auth/core/adapters';


export const db = drizzle(sql);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    password: text('password').notNull(),
    status: text('status').default('active'),
    createdAt: timestamp('created_at').defaultNow(),
    lastLogin: timestamp('last_login').defaultNow(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);


export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}
export async function getUserStatusByEmail(email: string) {
  const statuses = await db.select({ status: users.status }).from(users).where(eq(users.email, email));
  if (statuses.length > 0) return statuses[0].status;
  return '';
}
export async function getAllUser() {
  return await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    status: users.status,
    lastLogin: users.lastLogin,
    createdAt: users.createdAt
  }).from(users);
}

export async function updateUserStatus(id: number, status: string) {
  return await db.update(users)
    .set({ status })
    .where(eq(users.id, id));
}

export async function updateUserLastLogin(email: string) {
  return await db.update(users)
    .set({ lastLogin: new Date() })
    .where(eq(users.email, email));
}

export async function updateAllUserStatus(status: string) {
  return await db.update(users)
    .set({ status });
}

export async function deleteUserWithId(id: number) {
  return await db.delete(users).where(eq(users.id, id));
}
export async function deleteAllUser(email: string) {
  return await db.delete(users);
}


export async function createUser(email: string, password: string, name: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash, name });
}
