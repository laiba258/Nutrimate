import { pgTable, serial, text, integer, real, boolean, timestamp } from 'drizzle-orm/pg-core'

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  instructions: text('instructions').notNull(),
  imageUrl: text('image_url'),
  cookingTime: integer('cooking_time'),
  costLevel: text('cost_level'),
  isZeroWaste: boolean('is_zero_waste').default(false),
  sustainabilityTip: text('sustainability_tip'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const nutrition = pgTable('nutrition', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references(() => recipes.id, { onDelete: 'cascade' }),
  calories: integer('calories').notNull(),
  protein: real('protein').notNull(),
  carbs: real('carbs').notNull(),
  fat: real('fat').notNull(),
})

export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique(),
  name: text('name'),
  dailyCalorieGoal: integer('daily_calorie_goal'),
  dietPreference: text('diet_preference'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
