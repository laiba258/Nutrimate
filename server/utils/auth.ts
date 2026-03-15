import { createHash, randomBytes } from 'crypto'
import type { H3Event } from 'h3'
import type { SessionUser } from '../types'

// SHA-256 password hashing
export function hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash
}

// Session stored in a signed cookie
const SESSION_KEY = 'nutrimate_session'

export function setSession(event: H3Event, user: SessionUser) {
    const payload = Buffer.from(JSON.stringify(user)).toString('base64')
    setCookie(event, SESSION_KEY, payload, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    })
}

export function getUserSession(event: H3Event): SessionUser | null {
    const cookie = getCookie(event, SESSION_KEY)
    if (!cookie) return null
    try {
        return JSON.parse(Buffer.from(cookie, 'base64').toString('utf8')) as SessionUser
    } catch {
        return null
    }
}

export function clearUserSession(event: H3Event) {
    deleteCookie(event, SESSION_KEY)
}

export function requireAuth(event: H3Event): SessionUser {
    const session = getUserSession(event)
    if (!session) throw createError({ statusCode: 401, message: 'Unauthorized' })
    return session
}

export function requireAdmin(event: H3Event): SessionUser {
    const session = requireAuth(event)
    if (session.role !== 'admin') throw createError({ statusCode: 403, message: 'Forbidden' })
    return session
}
