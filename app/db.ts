import { drizzle } from 'drizzle-orm/vercel-postgres';
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

const db = drizzle(sql);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    password: text('password').notNull(),
    status: text('status').default('active'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);


export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}
export async function getAllUser() {
  return await db.select().from(users);
}

export async function updateUserStatus(email: string, status: string) {

  return await db.update(users)
    .set({ status, updatedAt: new Date() })
    .where(eq(users.email, email));
}
export async function updateAllUserStatus(status: string) {
  return await db.update(users)
    .set({ status, updatedAt: new Date() });
}

export async function deleteUserWithEmail(email: string) {
  return await db.delete(users).where(eq(users.email, email));
}
export async function deleteAllUser(email: string) {
  return await db.delete(users);
}


export async function createUser(email: string, password: string, name: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash, name });
}
