import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const session = requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody<{ role: 'admin' | 'user' }>(event)

    if (id === session.id) throw createError({ statusCode: 400, message: "You can't change your own role" })

    const [updated] = await db.update(users).set({ role: body.role }).where(eq(users.id, id)).returning()
    if (!updated) throw createError({ statusCode: 404, message: 'User not found' })

    return updated
})
