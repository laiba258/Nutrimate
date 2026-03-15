import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const session = requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))

    if (id === session.id) throw createError({ statusCode: 400, message: "You can't delete yourself" })

    const [deleted] = await db.delete(users).where(eq(users.id, id)).returning()
    if (!deleted) throw createError({ statusCode: 404, message: 'User not found' })

    return { success: true }
})
