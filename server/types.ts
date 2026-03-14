export interface RecipeRow {
    id: number
    title: string
    description: string | null
    instructions: string
    imageUrl: string | null
    cookingTime: number | null
    costLevel: string | null
    isZeroWaste: boolean | null
    sustainabilityTip: string | null
    createdAt: Date
    updatedAt: Date
}

export interface NutritionRow {
    id: number
    recipeId: number | null
    calories: number
    protein: number
    carbs: number
    fat: number
}

export interface RecipeWithNutrition extends RecipeRow {
    nutrition: NutritionRow | null
}

export interface CreateRecipeBody {
    title: string
    description?: string
    instructions: string
    imageUrl?: string
    cookingTime?: number
    costLevel?: string
    isZeroWaste?: boolean
    sustainabilityTip?: string
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
}
