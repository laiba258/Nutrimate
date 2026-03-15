import { db } from '../../db/index'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword, setSession } from '../../utils/auth'
import type { RegisterBody } from '../../types'

export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterBody>(event)

    if (!body.name || !body.email || !body.password) {
        throw createError({ statusCode: 400, message: 'Name, email and password are required' })
    }

    const existing = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
    if (existing.length) {
        throw createError({ statusCode: 409, message: 'Email already registered' })
    }

    // First user becomes admin
    const allUsers = await db.select({ id: users.id }).from(users).limit(1)
    const role = allUsers.length === 0 ? 'admin' : 'user'

    const [user] = await db.insert(users).values({
        name: body.name,
        email: body.email,
        passwordHash: hashPassword(body.password),
        role,
    }).returning()

    if (!user) throw createError({ statusCode: 500, message: 'Failed to create user' })

    setSession(event, { id: user.id, name: user.name, email: user.email, role: user.role })

    return { id: user.id, name: user.name, email: user.email, role: user.role }
})
