import { pgTable, serial, text, integer, real, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['admin', 'user'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  instructions: text('instructions').notNull(),
  imageUrl: text('image_url'),
  cookingTime: integer('cooking_time'),
  costLevel: text('cost_level'),
  category: text('category'),
  isZeroWaste: boolean('is_zero_waste').default(false),
  sustainabilityTip: text('sustainability_tip'),
  ingredients: text('ingredients'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords'),
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

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const tips = pgTable('tips', {
  id: serial('id').primaryKey(),
  ingredient: text('ingredient').notNull(),
  tip: text('tip').notNull(),
  icon: text('icon').default('🌿'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  dailyCalorieGoal: integer('daily_calorie_goal'),
  dietPreference: text('diet_preference'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
