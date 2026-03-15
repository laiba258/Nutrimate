import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { verifyPassword, setSession } from '../../utils/auth'
import type { LoginBody } from '../../types'

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginBody>(event)

    if (!body.email || !body.password) {
        throw createError({ statusCode: 400, message: 'Email and password are required' })
    }

    const [user] = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
    if (!user) throw createError({ statusCode: 401, message: 'No account found with this email' })

    if (!verifyPassword(body.password, user.passwordHash)) {
        throw createError({ statusCode: 401, message: 'Incorrect password' })
    }

    setSession(event, { id: user.id, name: user.name, email: user.email, role: user.role })

    return { id: user.id, name: user.name, email: user.email, role: user.role }
})
