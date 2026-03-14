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

## ✅ FRONTEND

### Pages
- [x] `index.vue` — Connect trending recipes from real API
- [x] `recipe.vue` — Fetch recipes from DB instead of static array
- [x] `recipe.vue` — Filter panel connected to real backend query
- [x] `profile.vue` — Connect health metrics to real user data / input form
- [x] `zero-waste.vue` — Expand tips library (15 ingredients), themed
- [x] `admin/index.vue` — Wire up Add Recipe form to POST API
- [x] `admin/index.vue` — Wire up Edit / Delete buttons to API
- [x] `admin/index.vue` — Add admin auth guard (middleware + login page)

### Components
- [x] `RecipePreviewCard.vue` — Add missing `alt` on `<img>`
- [x] `RecipeDetail.vue` — Add missing `alt` on `<img>`
- [x] `HomeHero.vue` — Unsplash image has alt tag
- [x] Add loading skeletons for async data (recipe.vue + index.vue)
- [x] Add empty state components (recipe.vue + index.vue)

### Missing Pages
- [x] `/recipes` page — redirects to `/recipe`
- [x] 404 error page (`app/error.vue`)

---

## ✅ AUTH
- [x] localStorage-based auth (no DB required)
- [x] Login page (`/login`) — themed split-panel
- [x] Register page (`/register`) — first user = admin automatically
- [x] Protect `/admin` route with middleware
- [x] Admin button in nav — only visible to admin users
- [x] User dropdown in nav with logout

---

## ✅ ADMIN DASHBOARD
- [x] Sidebar layout with 7 sections
- [x] Overview — live stats, recent recipes/users, quick actions
- [x] Recipes — full CRUD, inline slide panel, SEO fields, Google preview, image preview, nutrition, category/cost filters
- [x] Tips — full CRUD, inline slide panel with live preview
- [x] Ingredients — add/remove/search
- [x] Categories — manage recipe categories
- [x] Users — change roles (admin ↔ user), delete users
- [x] Settings — update name, change password, danger zone

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
