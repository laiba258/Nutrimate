import { db } from '../../db/index'
import { categories } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const { name } = await readBody<{ name: string }>(event)
    if (!name?.trim()) throw createError({ statusCode: 400, message: 'Name is required' })

    const existing = await db.select().from(categories).where(eq(categories.name, name.trim())).limit(1)
    if (existing.length) throw createError({ statusCode: 409, message: 'Category already exists' })

    const [created] = await db.insert(categories).values({ name: name.trim() }).returning()
    return created
})
