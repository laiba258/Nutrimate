<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Recipe {
  id: number
  title: string
  imageUrl: string | null
  cookingTime: number | null
  costLevel: string | null
  isZeroWaste: boolean | null
  sustainabilityTip: string | null
  instructions: string
  nutrition: { calories: number; protein: number; carbs: number; fat: number } | null
}

const isFilterOpen = ref(false)
const calorieLimit = ref(800)
const selectedTime = ref('All')
const selectedIngredients = ref<string[]>([])
const activeCategory = ref('All')
const isDetailOpen = ref(false)
const selectedRecipe = ref<Recipe | null>(null)

const categories = ['All', 'Zero Waste', 'High Protein', 'Budget Friendly', 'Quick Fix', 'Vegan']

// Build query params reactively
const queryParams = computed(() => {
  const p: Record<string, string> = {}
  if (activeCategory.value !== 'All') p.category = activeCategory.value
  if (calorieLimit.value < 800) p.maxCalories = String(calorieLimit.value)
  if (selectedTime.value !== 'All') p.maxTime = selectedTime.value
  return p
})

const { data: recipes, refresh } = await useFetch<Recipe[]>('/api/recipes', {
  lazy: true,
  query: queryParams,
})

// Client-side ingredient filter (no DB column for ingredients yet)
const filteredRecipes = computed(() => {
  if (!recipes.value) return []
  if (selectedIngredients.value.length === 0) return recipes.value
  return recipes.value.filter(r =>
    selectedIngredients.value.some(ing =>
      r.title.toLowerCase().includes(ing.toLowerCase()) ||
      r.sustainabilityTip?.toLowerCase().includes(ing.toLowerCase())
    )
  )
})

function openRecipeDetail(recipe: Recipe) {
  selectedRecipe.value = recipe
  isDetailOpen.value = true
}

function toggleIngredient(ing: string) {
  const index = selectedIngredients.value.indexOf(ing)
  if (index > -1) selectedIngredients.value.splice(index, 1)
  else selectedIngredients.value.push(ing)
}

onMounted(() => {
  if (route.query.openFilter === 'true') isFilterOpen.value = true
})

// Map recipe to RecipeDetail shape
const detailRecipe = computed(() => {
  if (!selectedRecipe.value) return null
  const r = selectedRecipe.value
  return {
    title: r.title,
    image: r.imageUrl ?? 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500',
    category: r.costLevel ?? 'Healthy',
    protein: r.nutrition ? r.nutrition.protein + 'g' : '0g',
    carbs: r.nutrition ? r.nutrition.carbs + 'g' : '0g',
    fats: r.nutrition ? r.nutrition.fat + 'g' : '0g',
    ingredients: [] as string[],
    instructions: r.instructions ? r.instructions.split('\n').filter(Boolean) : [],
    hack: r.sustainabilityTip ?? undefined,
  }
})
</script>

<template>
  <main class="bg-[#FCFCFC] min-h-screen pb-32 relative">
    
    <Transition name="slide-fade">
      <div v-if="isFilterOpen" class="fixed inset-0 z-[100] flex justify-end">
        <div class="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" @click="isFilterOpen = false" />
        <div class="relative w-full max-w-sm bg-white h-screen shadow-2xl flex flex-col border-l border-slate-100">
          <div class="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
            <h3 class="text-2xl font-black text-slate-900 tracking-tighter">Filter Logic.</h3>
            <button class="w-10 h-10 flex bg-slate-50 hover:bg-emerald-500 hover:text-white rounded-full transition-all items-center justify-center" @click="isFilterOpen = false">
              <UIcon name="i-lucide-x" class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
            <div class="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 space-y-6">
              <div class="flex justify-between items-end">
                <p class="text-[10px] font-black uppercase tracking-widest text-emerald-700">Max Calories</p>
                <p class="text-2xl font-black text-slate-900">{{ calorieLimit }} <span class="text-xs text-slate-400 font-medium">kcal</span></p>
              </div>
              <input v-model="calorieLimit" type="range" min="100" max="1000" step="50" class="w-full h-1.5 bg-white border border-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-500">
            </div>

            <div class="space-y-4">
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Preparation Time</p>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="t in ['All', '10', '20', '30']" :key="t" :class="[selectedTime === t ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border text-slate-500']" class="py-3 rounded-2xl text-[10px] font-black uppercase transition-all" @click="selectedTime = t">
                  {{ t === 'All' ? 'Any Time' : t + ' min' }}
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Key Ingredients</p>
              <div class="flex flex-wrap gap-2">
                <button v-for="ing in ['Avocado', 'Berry', 'Spinach', 'Tofu', 'Salmon', 'Pasta']" :key="ing" :class="[selectedIngredients.includes(ing) ? 'bg-emerald-500 text-white' : 'bg-white border']" class="px-4 py-2 rounded-full text-[10px] font-bold transition-all" @click="toggleIngredient(ing)">
                  {{ ing }}
                </button>
              </div>
            </div>
          </div>

          <div class="p-8 bg-white border-t">
            <button class="w-full bg-emerald-500 hover:bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all" @click="isFilterOpen = false">
              Show Results
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <header class="relative pt-32 pb-20 px-6 overflow-hidden text-center">
      <div class="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"/>
      <div class="max-w-7xl mx-auto space-y-6 relative z-10">
        <h1 class="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
          Discover <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 font-serif italic font-light lowercase">delicious logic.</span>
        </h1>
      </div>
    </header>

    <div class="sticky top-0 z-40 bg-[#FCFCFC]/60 backdrop-blur-xl border-y border-slate-100 py-4 mb-12">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          <button v-for="cat in categories" :key="cat" :class="[activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-emerald-50']" class="whitespace-nowrap px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all" @click="activeCategory = cat">
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <section class="max-w-7xl mx-auto px-6">
      <!-- Loading skeletons -->
      <div v-if="!recipes" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="i in 8" :key="i" class="animate-pulse">
          <div class="aspect-square rounded-[2.5rem] bg-slate-100 mb-5" />
          <div class="px-2 space-y-2">
            <div class="h-4 bg-slate-100 rounded-lg w-3/4" />
            <div class="h-3 bg-slate-100 rounded-lg w-1/2" />
          </div>
        </div>
      </div>
      <!-- Empty state -->
      <div v-else-if="filteredRecipes.length === 0" class="text-center py-32">
        <div class="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 text-emerald-300" />
        </div>
        <p class="text-slate-400 font-semibold text-lg">No recipes match your filters.</p>
        <button class="mt-4 text-emerald-500 font-black text-sm hover:underline" @click="activeCategory = 'All'; calorieLimit = 800; selectedTime = 'All'">Clear filters</button>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="(recipe, index) in filteredRecipes" :key="index" class="group animate-reveal cursor-pointer" @click="openRecipeDetail(recipe)">
          <div class="relative aspect-square rounded-[2.5rem] overflow-hidden mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
            <img :src="recipe.imageUrl ?? 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500'" :alt="recipe.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          </div>
          <div class="px-2 space-y-2">
            <h3 class="text-base font-black text-slate-900 truncate group-hover:text-emerald-500">{{ recipe.title }}</h3>
            <div class="flex items-center gap-3">
              <span class="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{{ recipe.nutrition?.calories ?? '—' }} kcal</span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ recipe.cookingTime ? recipe.cookingTime + ' min' : '—' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <RecipeDetail v-if="detailRecipe" :is-open="isDetailOpen" :recipe="detailRecipe" @close="isDetailOpen = false" />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&display=swap');
.font-serif { font-family: 'Cormorant+Garamond', serif; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateX(100%); opacity: 0; }
@keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-reveal { animation: reveal 0.8s ease-out forwards; opacity: 0; }
</style>