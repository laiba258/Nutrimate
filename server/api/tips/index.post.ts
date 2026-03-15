import { db } from '../../db/index'
import { tips } from '../../db/schema'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const body = await readBody<{ ingredient: string; tip: string; icon?: string }>(event)
    if (!body.ingredient || !body.tip) throw createError({ statusCode: 400, message: 'Ingredient and tip are required' })

    const [created] = await db.insert(tips).values({
        ingredient: body.ingredient,
        tip: body.tip,
        icon: body.icon ?? '🌿',
    }).returning()
    return created
})
