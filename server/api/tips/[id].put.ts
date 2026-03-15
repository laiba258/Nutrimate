import { db } from '../../db/index'
import { tips } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody<{ ingredient: string; tip: string; icon?: string }>(event)

    const [updated] = await db.update(tips).set({
        ingredient: body.ingredient,
        tip: body.tip,
        icon: body.icon ?? '🌿',
    }).where(eq(tips.id, id)).returning()

    if (!updated) throw createError({ statusCode: 404, message: 'Tip not found' })
    return updated
})
