import { db } from '../../db/index'
import { userProfiles, users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const session = requireAuth(event)
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, session.id)).limit(1)
    return {
        id: profile?.id ?? null,
        name: session.name,
        email: session.email,
        role: session.role,
        dailyCalorieGoal: profile?.dailyCalorieGoal ?? null,
        dietPreference: profile?.dietPreference ?? null,
    }
})
