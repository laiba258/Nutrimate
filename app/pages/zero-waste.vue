<script setup lang="ts">
import { ref, computed } from 'vue'

interface Tip {
  id: number
  ingredient: string
  tip: string
  icon: string | null
}

const ingredients = ref<string[]>([])
const newIngredient = ref('')

const { data: allTips } = await useFetch<Tip[]>('/api/tips', { lazy: true })

function addIngredient() {
  const val = newIngredient.value.trim().toLowerCase()
  if (val && !ingredients.value.includes(val)) {
    ingredients.value.push(val)
  }
  newIngredient.value = ''
}

function removeIngredient(index: number) {
  ingredients.value.splice(index, 1)
}

const activeTips = computed(() => {
  if (!allTips.value || !ingredients.value.length) return []
  return allTips.value.filter(t =>
    ingredients.value.some(ing => t.ingredient.toLowerCase().includes(ing) || ing.includes(t.ingredient.toLowerCase()))
  )
})

const recipeLibrary = [
  { title: 'Lemon Curd', tags: ['lemon'], icon: '🍋', description: 'A creamy spread using fresh juice and zest.' },
  { title: 'Garlic Croutons', tags: ['bread'], icon: '🍞', description: 'Crunchy toppings for salads from stale bread.' },
  { title: 'Tomato Pasta Sauce', tags: ['tomato', 'pasta'], icon: '🍝', description: 'Rich sauce made from overripe tomatoes.' },
  { title: 'Crispy Peel Chips', tags: ['potato'], icon: '🥔', description: 'Roasted skins with sea salt and rosemary.' },
  { title: 'Banana Bread', tags: ['banana'], icon: '🍌', description: 'Moist loaf from overripe bananas.' },
  { title: 'Egg Fried Rice', tags: ['egg', 'rice'], icon: '🍳', description: 'Classic fried rice with day-old rice and eggs.' },
  { title: 'Bone Broth Soup', tags: ['chicken'], icon: '🍲', description: 'Nutrient-dense broth from chicken bones.' },
  { title: 'Carrot Top Pesto', tags: ['carrot'], icon: '🥕', description: 'Vibrant pesto from carrot greens and olive oil.' },
  { title: 'Spinach Smoothie', tags: ['spinach', 'banana'], icon: '🥤', description: 'Wilted spinach blended into a green power drink.' },
  { title: 'Onion Skin Broth', tags: ['onion'], icon: '🧅', description: 'Golden broth from onion skins — zero waste base.' },
]

const matchingRecipes = computed(() => {
  if (!ingredients.value.length) return []
  return recipeLibrary.filter(recipe =>
    recipe.tags.some(tag => ingredients.value.includes(tag))
  )
})

const sdgFacts = [
  { icon: '🌍', stat: '1/3', label: 'of all food produced globally is wasted each year' },
  { icon: '💧', stat: '25%', label: 'of the world\'s fresh water is used to grow food that is never eaten' },
  { icon: '🌱', stat: '8%', label: 'of global greenhouse gas emissions come from food waste' },
]
</script>

<template>
  <div class="min-h-screen bg-[#FCFCFC] pb-32">

    <!-- Hero -->
    <div class="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 text-center overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-emerald-50/60 rounded-full blur-[120px] pointer-events-none" />
      <div class="relative z-10 space-y-4 max-w-2xl mx-auto">
        <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">SDG 12 — Responsible Consumption</p>
        <h1 class="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
          Zero<br><span class="text-emerald-500 italic font-serif font-light">Waste.</span>
        </h1>
        <p class="text-sm text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
          Enter ingredients you have. Get smart tips and matching recipes to use every last bit.
        </p>
      </div>
    </div>

    <!-- SDG Facts -->
    <div class="max-w-4xl mx-auto px-4 md:px-6 mb-12">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div v-for="fact in sdgFacts" :key="fact.stat" class="bg-white rounded-[1.5rem] border border-slate-100 p-6 text-center shadow-sm">
          <div class="text-3xl mb-2">{{ fact.icon }}</div>
          <p class="text-3xl font-black text-emerald-500 tracking-tighter">{{ fact.stat }}</p>
          <p class="text-xs text-slate-400 mt-1 leading-relaxed">{{ fact.label }}</p>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 md:px-6 space-y-10">

      <!-- Ingredient Input -->
      <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-8 space-y-5">
        <div>
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-2">What do you have?</p>
          <h2 class="text-2xl font-black text-slate-900 tracking-tighter">Enter your ingredients</h2>
        </div>
        <div class="flex gap-3">
          <input
            v-model="newIngredient"
            type="text"
            placeholder="e.g. Lemon, Bread, Tomato..."
            class="flex-1 min-w-0 px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            @keyup.enter="addIngredient"
          >
          <button
            class="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-100"
            @click="addIngredient"
          >
            Add
          </button>
        </div>
        <div v-if="ingredients.length" class="flex flex-wrap gap-2">
          <span
            v-for="(item, index) in ingredients"
            :key="index"
            class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold capitalize"
          >
            {{ item }}
            <button class="hover:text-red-500 transition-colors font-black text-base leading-none" @click="removeIngredient(index)">×</button>
          </span>
        </div>
      </div>

      <!-- Results -->
      <div v-if="ingredients.length > 0" class="space-y-10">

        <!-- Tips from DB -->
        <div v-if="activeTips.length > 0" class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 ml-2">Zero-Waste Tips</p>
          <div class="grid gap-4">
            <div
              v-for="tip in activeTips"
              :key="tip.id"
              class="bg-white rounded-[2rem] border border-slate-100 p-6 flex gap-5 shadow-sm hover:shadow-md transition-all"
            >
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-2xl">
                {{ tip.icon || '🌿' }}
              </div>
              <div>
                <p class="font-black text-slate-900 capitalize tracking-tight">{{ tip.ingredient }}</p>
                <p class="text-sm text-slate-500 mt-1 leading-relaxed">{{ tip.tip }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Matching Recipes -->
        <div v-if="matchingRecipes.length > 0" class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 ml-2">Recipes You Can Make</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="recipe in matchingRecipes"
              :key="recipe.title"
              class="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
            >
              <div class="h-32 bg-emerald-50 rounded-2xl mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
                {{ recipe.icon }}
              </div>
              <h3 class="font-black text-slate-900 tracking-tight group-hover:text-emerald-500 transition-colors">{{ recipe.title }}</h3>
              <p class="text-sm text-slate-400 mt-1 leading-relaxed">{{ recipe.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1">
                <span v-for="tag in recipe.tags" :key="tag" class="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTips.length === 0 && matchingRecipes.length === 0" class="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
          <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p class="text-slate-400 font-medium text-sm">No tips found for these ingredients yet.</p>
          <p class="text-slate-300 text-xs mt-1">Try: lemon, bread, tomato, potato, banana, egg, onion, spinach, rice, chicken, carrot</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
        <div class="text-6xl mb-4">🌿</div>
        <p class="text-slate-700 font-black text-lg tracking-tight">Start with what you have</p>
        <p class="text-slate-400 font-medium text-sm mt-2">Add ingredients above to discover tips and recipes.</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap');
.font-serif { font-family: 'Cormorant+Garamond', serif; }
</style>
