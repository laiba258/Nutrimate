import { db } from '../../db/index'
import { recipes, nutrition, userProfiles } from '../../db/schema'
import { eq, inArray } from 'drizzle-orm'
import { requireAuth } from '../../utils/auth'

// Maps diet preference to recipe categories + calorie range
const dietMap: Record<string, { categories: string[]; maxCalories?: number; minProtein?: number }> = {
    'Weight Loss': { categories: ['Budget Friendly', 'Quick Fix', 'Vegan'], maxCalories: 400 },
    'Muscle Gain': { categories: ['High Protein'], minProtein: 25 },
    'Diabetic': { categories: ['Vegan', 'High Protein'], maxCalories: 450 },
    'Vegan': { categories: ['Vegan', 'Zero Waste'] },
    'Keto': { categories: ['High Protein'], maxCalories: 500 },
    'Balanced': { categories: ['Budget Friendly', 'Quick Fix', 'High Protein', 'Zero Waste', 'Vegan'] },
}

export default defineEventHandler(async (event) => {
    let userId: number | null = null
    let dietPreference = 'Balanced'
    let dailyCalorieGoal: number | null = null

    try {
        const session = requireAuth(event)
        userId = session.id
        const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, session.id)).limit(1)
        dietPreference = profile?.dietPreference ?? 'Balanced'
        dailyCalorieGoal = profile?.dailyCalorieGoal ?? null
    } catch {
        // not logged in — return general balanced picks
    }

    const rule = dietMap[dietPreference] ?? dietMap['Balanced']

    const allRecipes = await db.select().from(recipes).orderBy(recipes.createdAt)
    const recipeIds = allRecipes.map(r => r.id)
    const nutritionRows = recipeIds.length
        ? await db.select().from(nutrition).where(inArray(nutrition.recipeId, recipeIds))
        : []
    const nutritionMap = new Map(nutritionRows.map(n => [n.recipeId, n]))

    let result = allRecipes.map(r => ({ ...r, nutrition: nutritionMap.get(r.id) ?? null }))

    // Filter by matching categories
    result = result.filter(r => rule.categories.includes(r.category ?? ''))

    // Filter by max calories (use per-meal goal if available: dailyCalorieGoal / 3)
    const maxCal = rule.maxCalories ?? (dailyCalorieGoal ? Math.round(dailyCalorieGoal / 3) : undefined)
    if (maxCal) result = result.filter(r => (r.nutrition?.calories ?? 9999) <= maxCal)

    // Filter by min protein
    if (rule.minProtein) result = result.filter(r => (r.nutrition?.protein ?? 0) >= rule.minProtein!)

    // Return up to 6, fallback to any recipes if none match
    if (result.length === 0) result = allRecipes.map(r => ({ ...r, nutrition: nutritionMap.get(r.id) ?? null }))

    return result.slice(0, 6)
})
