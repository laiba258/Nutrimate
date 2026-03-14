import { db } from '../../db/index'
import { userProfiles } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        name?: string
        dailyCalorieGoal?: number
        dietPreference?: string
        id?: number
    }>(event)

    if (body.id) {
        const [updated] = await db.update(userProfiles).set({
            name: body.name,
            dailyCalorieGoal: body.dailyCalorieGoal,
            dietPreference: body.dietPreference,
        }).where(eq(userProfiles.id, body.id)).returning()
        return updated
    }

    const [created] = await db.insert(userProfiles).values({
        name: body.name ?? null,
        dailyCalorieGoal: body.dailyCalorieGoal ?? null,
        dietPreference: body.dietPreference ?? null,
    }).returning()

    return created
})
