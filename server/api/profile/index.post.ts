import { db } from '../../db/index'
import { userProfiles, users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const session = requireAuth(event)
    const body = await readBody<{ dailyCalorieGoal?: number; dietPreference?: string }>(event)

    const existing = await db.select().from(userProfiles).where(eq(userProfiles.userId, session.id)).limit(1)

    if (existing.length) {
        const [updated] = await db.update(userProfiles).set({
            dailyCalorieGoal: body.dailyCalorieGoal ?? null,
            dietPreference: body.dietPreference ?? null,
        }).where(eq(userProfiles.userId, session.id)).returning()
        return updated
    }

    const [created] = await db.insert(userProfiles).values({
        userId: session.id,
        dailyCalorieGoal: body.dailyCalorieGoal ?? null,
        dietPreference: body.dietPreference ?? null,
    }).returning()
    return created
})
