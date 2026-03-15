import { db } from '../../db/index'
import { ingredients } from '../../db/schema'

export default defineEventHandler(async () => {
    return db.select().from(ingredients).orderBy(ingredients.name)
})
