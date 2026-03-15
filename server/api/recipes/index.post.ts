import { db } from '../../db/index'
import { recipes, nutrition } from '../../db/schema'
import { requireAdmin } from '../../utils/auth'
import type { CreateRecipeBody } from '../../types'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const body = await readBody<CreateRecipeBody>(event)

    if (!body.title || !body.instructions) {
        throw createError({ statusCode: 400, message: 'Title and instructions are required' })
    }

    const [recipe] = await db.insert(recipes).values({
        title: body.title,
        description: body.description ?? null,
        instructions: body.instructions,
        imageUrl: body.imageUrl ?? null,
        cookingTime: body.cookingTime ?? null,
        costLevel: body.costLevel ?? null,
        category: body.category ?? null,
        isZeroWaste: body.isZeroWaste ?? false,
        sustainabilityTip: body.sustainabilityTip ?? null,
        ingredients: body.ingredients ?? null,
        seoTitle: body.seoTitle ?? null,
        seoDescription: body.seoDescription ?? null,
        seoKeywords: body.seoKeywords ?? null,
    }).returning()

    if (body.calories !== undefined && recipe) {
        await db.insert(nutrition).values({
            recipeId: recipe.id,
            calories: body.calories,
            protein: body.protein ?? 0,
            carbs: body.carbs ?? 0,
            fat: body.fat ?? 0,
        })
    }

    return recipe
})
