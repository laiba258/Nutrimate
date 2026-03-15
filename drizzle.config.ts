import { defineConfig } from 'drizzle-kit'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
}

export default defineConfig({
    schema: './server/db/schema.ts',
    out: './server/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: dbUrl,
        ssl: { rejectUnauthorized: false },
    },
})
