import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth, hashPassword, verifyPassword } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const session = requireAuth(event)
    const { currentPassword, newPassword } = await readBody<{ currentPassword: string; newPassword: string }>(event)

    if (!currentPassword || !newPassword) {
        throw createError({ statusCode: 400, message: 'Both fields are required' })
    }

    const [user] = await db.select().from(users).where(eq(users.id, session.id)).limit(1)
    if (!user) throw createError({ statusCode: 404, message: 'User not found' })

    if (!verifyPassword(currentPassword, user.passwordHash)) {
        throw createError({ statusCode: 401, message: 'Current password is incorrect' })
    }

    await db.update(users).set({ passwordHash: hashPassword(newPassword) }).where(eq(users.id, session.id))
    return { success: true }
})
