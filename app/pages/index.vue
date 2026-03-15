<script setup lang="ts">
interface Recipe {
  id: number
  title: string
  imageUrl: string | null
  cookingTime: number | null
  costLevel: string | null
  isZeroWaste: boolean | null
  nutrition: { calories: number; protein: number; carbs: number; fat: number } | null
}

const { data: allRecipes } = await useFetch<Recipe[]>('/api/recipes', { lazy: true })

const featuredRecipes = computed(() =>
  (allRecipes.value ?? []).slice(0, 3).map(r => ({
    title: r.title,
    image: r.imageUrl ?? 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500',
    badge: r.isZeroWaste ? 'Zero Waste' : (r.costLevel ?? 'Healthy'),
    badgeColor: r.isZeroWaste ? 'teal' : r.costLevel === 'Low' ? 'emerald' : 'blue',
    calories: r.nutrition?.calories ?? null,
    protein: r.nutrition?.protein ?? null,
    cookingTime: r.cookingTime,
  }))
)

const stats = [
  { value: '500+', label: 'Healthy Recipes' },
  { value: '30%', label: 'Less Food Waste' },
  { value: '10k+', label: 'Meals Tracked' },
  { value: '4.9★', label: 'User Rating' },
]

const features = [
  {
    icon: '📊',
    title: 'Smart Nutrition Tracking',
    description: 'Log your meals and get instant macro breakdowns. Understand exactly what you eat and how it fuels your body.',
  },
  {
    icon: '🌿',
    title: 'Zero Waste Kitchen',
    description: 'Enter ingredients you have and discover recipes that use every last bit. Reduce waste, save money, eat better.',
  },
  {
    icon: '💰',
    title: 'Budget-Aware Meals',
    description: 'Filter recipes by cost level. Eat nutritiously without breaking the bank — every meal is optimized for value.',
  },
  {
    icon: '❤️',
    title: 'Personalized Health Score',
    description: 'Track your hydration, nutrition quality, and activity. Get a real-time health score that motivates better choices.',
  },
]

const categories = [
  { name: 'Zero Waste', icon: '🌿', desc: 'Reduce food waste', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  { name: 'High Protein', icon: '💪', desc: 'Build muscle & recover', color: 'bg-blue-50 border-blue-100 text-blue-700' },
  { name: 'Budget Friendly', icon: '💰', desc: 'Eat well, spend less', color: 'bg-amber-50 border-amber-100 text-amber-700' },
  { name: 'Quick Fix', icon: '⚡', desc: 'Ready in under 20 min', color: 'bg-orange-50 border-orange-100 text-orange-700' },
  { name: 'Vegan', icon: '🥗', desc: 'Plant-based goodness', color: 'bg-teal-50 border-teal-100 text-teal-700' },
]
</script>

<template>
  <div class="bg-[#FCFCFC] min-h-screen">

    <!-- Hero -->
    <HomeHero />

    <!-- Stats Bar -->
    <section class="bg-slate-900 py-10">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="space-y-1">
            <p class="text-3xl font-black text-white tracking-tighter">{{ stat.value }}</p>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
      <div class="text-center mb-16 space-y-4">
        <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Simple by Design</p>
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
          How It <span class="text-emerald-500 italic font-serif font-light">Works.</span>
        </h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Three steps to a smarter, healthier, and more sustainable kitchen.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <div class="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

        <div v-for="(step, i) in [
          { num: '01', icon: 'i-heroicons-user-circle', title: 'Set Your Goals', desc: 'Tell us your calorie target, diet preference, and health goals. Takes 30 seconds.' },
          { num: '02', icon: 'i-heroicons-magnifying-glass', title: 'Discover Recipes', desc: 'Browse 500+ recipes filtered by your macros, budget, and available ingredients.' },
          { num: '03', icon: 'i-heroicons-chart-bar', title: 'Track & Improve', desc: 'Log meals, monitor your health score, and get smarter suggestions every day.' },
        ]" :key="i" class="relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
          <div class="absolute top-6 right-6 text-[64px] font-black text-slate-900/[0.03] leading-none select-none">{{ step.num }}</div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-500">
            <UIcon :name="step.icon" class="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors duration-500" />
          </div>
          <h3 class="text-lg font-black text-slate-900 tracking-tighter mb-3">{{ step.title }}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="bg-slate-50 py-20 md:py-32 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div class="text-center mb-16 space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Everything You Need</p>
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Built for <span class="text-emerald-500 italic font-serif font-light">Real Life.</span>
          </h2>
          <p class="text-slate-400 text-sm max-w-md mx-auto">Everything you need to eat smarter, waste less, and feel better — in one place.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="feature in features" :key="feature.title"
            class="bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-500 text-2xl">
              {{ feature.icon }}
            </div>
            <h3 class="text-lg font-black text-slate-900 tracking-tighter mb-3">{{ feature.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Browse by Category -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Explore</p>
          <h2 class="text-4xl font-black text-slate-900 tracking-tighter">Browse by Category.</h2>
        </div>
        <NuxtLink to="/recipe" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1 shrink-0">
          View All <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3 h-3" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <NuxtLink v-for="cat in categories" :key="cat.name" :to="`/recipe`"
          class="group bg-white rounded-[1.5rem] border p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
          :class="cat.color">
          <div class="text-4xl mb-3">{{ cat.icon }}</div>
          <p class="font-black text-sm tracking-tight">{{ cat.name }}</p>
          <p class="text-xs mt-1 opacity-70">{{ cat.desc }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Recipes -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-24">
      <div class="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm p-8 md:p-16 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50/60 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 relative z-10">
          <div class="space-y-3">
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Curated for You</p>
            <h2 class="text-4xl font-black text-slate-900 tracking-tighter leading-none">Smart Picks.</h2>
          </div>
          <NuxtLink to="/recipe" class="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1 shrink-0">
            View All Recipes <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3 h-3" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <template v-if="!allRecipes">
            <div v-for="i in 3" :key="i" class="animate-pulse bg-slate-50 rounded-[2rem] p-4">
              <div class="h-48 rounded-[1.5rem] bg-slate-100 mb-4" />
              <div class="space-y-2 px-2">
                <div class="h-4 bg-slate-100 rounded w-3/4" />
                <div class="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          </template>
          <template v-else-if="featuredRecipes.length === 0">
            <div class="col-span-3 text-center py-16">
              <p class="text-slate-400 font-medium">No recipes yet. <NuxtLink to="/admin/recipes" class="text-emerald-500 font-bold">Add some from the dashboard.</NuxtLink></p>
            </div>
          </template>
          <RecipePreviewCard v-else v-for="recipe in featuredRecipes" :key="recipe.title"
            :title="recipe.title"
            :image="recipe.image"
            :badge-text="recipe.badge"
            :badge-color="recipe.badgeColor"
            :macros="[
              { label: 'Kcal', value: String(recipe.calories ?? '—') },
              { label: 'Protein', value: recipe.protein ? recipe.protein + 'g' : '—' },
              { label: 'Time', value: recipe.cookingTime ? recipe.cookingTime + ' min' : '—' },
            ]"
          />
        </div>
      </div>
    </section>

    <!-- Zero Waste CTA -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-emerald-500 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-200 transition-all duration-500">
          <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
          <div class="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
          <div class="relative z-10 space-y-6">
            <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <span class="text-3xl">🌿</span>
            </div>
            <div>
              <h3 class="text-3xl font-black text-white tracking-tighter leading-tight">Zero Waste<br>Kitchen Tips</h3>
              <p class="text-emerald-100 text-sm mt-3 leading-relaxed">Enter what you have. Get smart tips to use every ingredient before it goes bad.</p>
            </div>
            <NuxtLink to="/zero-waste" class="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all">
              Try It Now <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3 h-3" />
            </NuxtLink>
          </div>
        </div>

        <div class="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full" />
          <div class="relative z-10 space-y-6">
            <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <span class="text-3xl">❤️</span>
            </div>
            <div>
              <h3 class="text-3xl font-black text-white tracking-tighter leading-tight">Your Personal<br>Health Score</h3>
              <p class="text-slate-400 text-sm mt-3 leading-relaxed">Track nutrition quality, hydration, and activity. See your wellness score update in real time.</p>
            </div>
            <NuxtLink to="/profile" class="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">
              View Score <UIcon name="i-heroicons-arrow-right-20-solid" class="w-3 h-3" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
      <div class="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-emerald-50 to-teal-50 p-12 md:p-24 border border-emerald-100/50 text-center space-y-8">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200%] bg-emerald-100/30 rounded-full blur-[80px] pointer-events-none" />
        <div class="relative z-10 space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Stay in the Loop</p>
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Stay Healthy, <span class="text-emerald-500 italic font-serif font-light">Stay Updated.</span>
          </h2>
          <p class="text-slate-400 text-sm max-w-sm mx-auto">Get weekly recipes, nutrition tips, and zero-waste hacks delivered to your inbox.</p>
        </div>
        <form class="relative z-10 flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 max-w-xl mx-auto" @submit.prevent>
          <input type="email" placeholder="Your email address" class="flex-1 bg-transparent px-6 py-4 outline-none text-slate-600 text-sm font-medium">
          <button class="bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl px-10 py-4 font-black text-[11px] uppercase tracking-widest transition-all">Subscribe</button>
        </form>
      </div>
    </section>

    <!-- Floating filter button -->
    <div class="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40">
      <NuxtLink to="/recipe?openFilter=true" class="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_20px_50px_rgba(16_185_129_/_0.3)] hover:scale-110 active:scale-95 transition-all">
        <div class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 group-hover:hidden" />
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18M7 8h10M11 12h2M9 16h6" />
        </svg>
        <span class="absolute -top-10 right-0 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none whitespace-nowrap">Filter Recipes</span>
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap');
.font-serif { font-family: 'Cormorant+Garamond', serif; }
</style>
