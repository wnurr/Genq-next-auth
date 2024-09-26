import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config'; 

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Get the connection URL from environment variables
  ssl: {
    rejectUnauthorized: false, // If you need SSL for remote databases like Heroku, otherwise adjust as needed
  },
});

export const db = drizzle(pool);
