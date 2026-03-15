import { db } from '../../db/index'
import { recipes, nutrition } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '../../utils/auth'
import type { CreateRecipeBody } from '../../types'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody<Partial<CreateRecipeBody>>(event)

    if (!id) throw createError({ statusCode: 400, message: 'Invalid ID' })

    const [updated] = await db.update(recipes).set({
        title: body.title,
        description: body.description,
        instructions: body.instructions,
        imageUrl: body.imageUrl,
        cookingTime: body.cookingTime,
        costLevel: body.costLevel,
        category: body.category,
        isZeroWaste: body.isZeroWaste,
        sustainabilityTip: body.sustainabilityTip,
        ingredients: body.ingredients,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        seoKeywords: body.seoKeywords,
        updatedAt: new Date(),
    }).where(eq(recipes.id, id)).returning()

    if (!updated) throw createError({ statusCode: 404, message: 'Recipe not found' })

    if (body.calories !== undefined) {
        const existing = await db.select().from(nutrition).where(eq(nutrition.recipeId, id))
        if (existing.length) {
            await db.update(nutrition).set({
                calories: body.calories,
                protein: body.protein ?? 0,
                carbs: body.carbs ?? 0,
                fat: body.fat ?? 0,
            }).where(eq(nutrition.recipeId, id))
        } else {
            await db.insert(nutrition).values({
                recipeId: id,
                calories: body.calories,
                protein: body.protein ?? 0,
                carbs: body.carbs ?? 0,
                fat: body.fat ?? 0,
            })
        }
    }

    return updated
})
