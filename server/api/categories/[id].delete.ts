import { db } from '../../db/index'
import { categories } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))
    const [deleted] = await db.delete(categories).where(eq(categories.id, id)).returning()
    if (!deleted) throw createError({ statusCode: 404, message: 'Category not found' })
    return { success: true }
})
