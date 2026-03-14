import { db } from '../../db/index'
import { userProfiles } from '../../db/schema'

export default defineEventHandler(async () => {
    // Returns first profile (single-user for now, extend with auth later)
    const [profile] = await db.select().from(userProfiles).limit(1)
    return profile ?? null
})
