import { db } from '../../db/index'
import { recipes } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))
    if (!id) throw createError({ statusCode: 400, message: 'Invalid ID' })

    const [deleted] = await db.delete(recipes).where(eq(recipes.id, id)).returning()
    if (!deleted) throw createError({ statusCode: 404, message: 'Recipe not found' })

    return { success: true }
})
