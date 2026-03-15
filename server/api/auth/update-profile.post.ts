import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth, setSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const session = requireAuth(event)
    const { name } = await readBody<{ name: string }>(event)
    if (!name?.trim()) throw createError({ statusCode: 400, message: 'Name is required' })

    const [updated] = await db.update(users).set({ name: name.trim() }).where(eq(users.id, session.id)).returning()
    if (!updated) throw createError({ statusCode: 404, message: 'User not found' })

    // Refresh session with new name
    setSession(event, { id: updated.id, name: updated.name, email: updated.email, role: updated.role })
    return { id: updated.id, name: updated.name, email: updated.email, role: updated.role }
})
