export interface CreateRecipeBody {
    title: string
    description?: string
    instructions: string
    imageUrl?: string
    cookingTime?: number
    costLevel?: string
    category?: string
    isZeroWaste?: boolean
    sustainabilityTip?: string
    ingredients?: string
    seoTitle?: string
    seoDescription?: string
    seoKeywords?: string
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
}

export interface RegisterBody {
    name: string
    email: string
    password: string
}

export interface LoginBody {
    email: string
    password: string
}

export interface SessionUser {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
}
