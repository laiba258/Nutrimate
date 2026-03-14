# NutriMate — Project Completion Checklist

## ✅ Done (Setup)
- [x] Nuxt 4 + Vue 3 project initialized
- [x] Nuxt UI v4 installed
- [x] Tailwind CSS v4 configured
- [x] ESLint (@nuxt/eslint) configured
- [x] Drizzle ORM + PostgreSQL setup
- [x] DB schema: recipes, nutrition, userProfiles
- [x] .vscode/settings.json (format on save)
- [x] All TypeScript errors fixed
- [x] All components use `<script setup lang="ts">`
- [x] Proper TypeScript types on all props

---

## 🔲 FRONTEND

### Pages
- [ ] `index.vue` — Connect trending recipes from real API (currently hardcoded)
- [ ] `recipe.vue` — Fetch recipes from DB instead of static array
- [ ] `recipe.vue` — Filter panel connected to real backend query
- [ ] `profile.vue` — Connect health metrics to real user data / input form
- [ ] `zero-waste.vue` — Expand tips library, connect to DB
- [ ] `admin/index.vue` — Wire up Add Recipe form to POST API
- [ ] `admin/index.vue` — Wire up Edit / Delete buttons to API
- [ ] `admin/index.vue` — Add admin auth guard (middleware)

### Components
- [ ] `RecipePreviewCard.vue` — Add missing `alt` on `<img>`
- [ ] `RecipeDetail.vue` — Add missing `alt` on `<img>`
- [ ] `HomeHero.vue` — Replace Unsplash URL with local/optimized image
- [ ] Add loading skeletons for async data
- [ ] Add empty state components

### Missing Pages
- [ ] `/recipes` page (footer links to it, doesn't exist yet)
- [ ] 404 error page

---

## 🔲 BACKEND (server/api/)

- [ ] `GET /api/recipes` — List all recipes (with filters: category, calories, time)
- [ ] `POST /api/recipes` — Create new recipe (admin)
- [ ] `PUT /api/recipes/[id]` — Update recipe (admin)
- [ ] `DELETE /api/recipes/[id]` — Delete recipe (admin)
- [ ] `GET /api/recipes/[id]` — Single recipe detail
- [ ] `GET /api/nutrition/[recipeId]` — Get nutrition for a recipe
- [ ] `POST /api/profile` — Save user profile / health data
- [ ] `GET /api/profile` — Get user profile

---

## 🔲 AUTH
- [ ] Decide: Clerk vs Nuxt Auth vs custom JWT
- [ ] Implement login / signup
- [ ] Protect `/admin` route with middleware
- [ ] Link userProfiles.clerkId to auth user

---

## 🔲 DATABASE
- [ ] Run `npm run db:generate` to generate migrations
- [ ] Run `npm run db:migrate` to apply to PostgreSQL
- [ ] Seed initial recipe data

---

## 🔲 DEPLOYMENT
- [ ] Set DATABASE_URL in production env
- [ ] Configure hosting (Vercel / Railway / etc.)
- [ ] Add .env.example file
- [ ] Production build test (`npm run build`)
