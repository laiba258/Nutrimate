import { db } from '../../db/index'
import { recipes, nutrition } from '../../db/schema'
import { eq, inArray } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const category = query.category as string | undefined
    const maxCalories = query.maxCalories ? Number(query.maxCalories) : undefined
    const maxTime = query.maxTime ? Number(query.maxTime) : undefined
    const search = query.search as string | undefined

    const allRecipes = await db.select().from(recipes).orderBy(recipes.createdAt)

    const recipeIds = allRecipes.map(r => r.id)
    const nutritionRows = recipeIds.length
        ? await db.select().from(nutrition).where(inArray(nutrition.recipeId, recipeIds))
        : []

    const nutritionMap = new Map(nutritionRows.map(n => [n.recipeId, n]))

    let result = allRecipes.map(r => ({
        ...r,
        nutrition: nutritionMap.get(r.id) ?? null,
    }))

    if (category && category !== 'All') {
        result = result.filter(r => r.category === category)
    }
    if (maxCalories) {
        result = result.filter(r => (r.nutrition?.calories ?? 0) <= maxCalories)
    }
    if (maxTime) {
        result = result.filter(r => (r.cookingTime ?? 0) <= maxTime)
    }
    if (search) {
        const s = search.toLowerCase()
        result = result.filter(r =>
            r.title.toLowerCase().includes(s) ||
            (r.ingredients ?? '').toLowerCase().includes(s) ||
            (r.description ?? '').toLowerCase().includes(s)
        )
    }

    // ingredient filter (comma-separated list)
    const ingredientFilter = query.ingredient as string | undefined
    if (ingredientFilter) {
        const ings = ingredientFilter.split(',').map(i => i.trim().toLowerCase()).filter(Boolean)
        result = result.filter(r =>
            ings.some(ing => (r.ingredients ?? '').toLowerCase().includes(ing))
        )
    }

    // diet preference filter
    const diet = query.diet as string | undefined
    const dietMap: Record<string, string[]> = {
        'Weight Loss': ['Budget Friendly', 'Quick Fix', 'Vegan'],
        'Muscle Gain': ['High Protein'],
        'Diabetic': ['Vegan', 'High Protein'],
        'Vegan': ['Vegan', 'Zero Waste'],
        'Keto': ['High Protein'],
    }
    if (diet && dietMap[diet]) {
        result = result.filter(r => dietMap[diet].includes(r.category ?? ''))
    }

    return result
})
