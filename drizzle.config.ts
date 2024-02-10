import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL || '',
    host: process.env.POSTGRES_HOST || '',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
  }
} satisfies Config;