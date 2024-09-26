import 'dotenv/config'; 
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './src/drizzle',
  schema: './src/schemas/index.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!, 
  },
  verbose: true,
  strict: true,
});
