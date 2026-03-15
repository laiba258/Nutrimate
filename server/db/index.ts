import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
}

// Strip sslmode=require from URL to avoid pg v9 strict cert verification
const connectionString = process.env.DATABASE_URL.replace('sslmode=require', 'sslmode=no-verify')

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
})

pool.on('error', (err) => {
    console.error('Unexpected database pool error:', err)
})

export const db = drizzle(pool, { schema })
