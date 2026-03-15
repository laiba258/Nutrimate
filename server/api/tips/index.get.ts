import { db } from '../../db/index'
import { tips } from '../../db/schema'

export default defineEventHandler(async () => {
    return db.select().from(tips).orderBy(tips.ingredient)
})
