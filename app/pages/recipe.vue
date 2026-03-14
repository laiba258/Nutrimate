<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isFilterOpen = ref(false)
const calorieLimit = ref(800)
const selectedTime = ref('All')
const selectedIngredients = ref([])
const activeCategory = ref('All')

const isDetailOpen = ref(false)
const selectedRecipe = ref(null)

const openRecipeDetail = (recipe) => {
  selectedRecipe.value = recipe
  isDetailOpen.value = true
}

const categories = ['All', 'Zero Waste', 'High Protein', 'Budget Friendly', 'Quick Fix', 'Vegan']

const recipes = [
  { title: 'Summer Berry Mix', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600', tag: 'High Protein', calories: 240, time: 10, category: 'High Protein', protein: '12g', carbs: '30g', fats: '5g', ingredients: ['Berry'], instructions: ['Wash berries', 'Add yogurt'], hack: 'Freeze berries' },
  { title: 'Green Pesto Pasta', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600', tag: 'Zero Waste', calories: 410, time: 15, category: 'Zero Waste', protein: '15g', carbs: '55g', fats: '18g', ingredients: ['Pasta', 'Basil'], instructions: ['Boil pasta'], hack: 'Use pasta water' },
  { title: 'Crispy Tofu Salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', tag: 'Quick Fix', calories: 180, time: 12, category: 'Quick Fix', protein: '18g', carbs: '10g', fats: '8g', ingredients: ['Tofu', 'Spinach'], instructions: ['Fry tofu'], hack: 'Water plants with tofu water' },
  { title: 'Egg & Avocado', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600', tag: 'Budget Friendly', calories: 320, time: 8, category: 'Budget Friendly', protein: '14g', carbs: '15g', fats: '22g', ingredients: ['Avocado', 'Egg'], instructions: ['Mash avocado'], hack: 'Grow avocado tree' },
  { title: 'Roasted Chickpeas', image: 'https://images.unsplash.com/photo-1515544824820-29b635ace304?w=600', tag: 'Vegan', calories: 150, time: 20, category: 'Vegan', protein: '9g', carbs: '25g', fats: '4g', ingredients: ['Chickpeas'], instructions: ['Roast chickpeas'], hack: 'Aquafaba meringue' },
  { title: 'Salmon Quinoa', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600', tag: 'High Protein', calories: 520, time: 25, category: 'High Protein', protein: '35g', carbs: '45g', fats: '20g', ingredients: ['Salmon'], instructions: ['Cook salmon'], hack: 'Fry salmon skin' }
]

// Open filter if coming from index
onMounted(() => {
  if (route.query.openFilter === 'true') {
    isFilterOpen.value = true
  }
})

// Combined Filter Logic
const filteredRecipes = computed(() => {
  return recipes.filter(r => {
    const catMatch = activeCategory.value === 'All' || r.category === activeCategory.value
    const calMatch = r.calories <= calorieLimit.value
    const timeMatch = selectedTime.value === 'All' || r.time <= parseInt(selectedTime.value)
    const ingMatch = selectedIngredients.value.length === 0 || selectedIngredients.value.some(ing => r.ingredients.includes(ing))
    return catMatch && calMatch && timeMatch && ingMatch
  })
})

const toggleIngredient = (ing) => {
  const index = selectedIngredients.value.indexOf(ing)
  if (index > -1) selectedIngredients.value.splice(index, 1)
  else selectedIngredients.value.push(ing)
}
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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="(recipe, index) in filteredRecipes" :key="index" class="group animate-reveal cursor-pointer" @click="openRecipeDetail(recipe)">
          <div class="relative aspect-square rounded-[2.5rem] overflow-hidden mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
            <img :src="recipe.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          </div>
          <div class="px-2 space-y-2">
            <h3 class="text-base font-black text-slate-900 truncate group-hover:text-emerald-500">{{ recipe.title }}</h3>
            <div class="flex items-center gap-3">
              <span class="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{{ recipe.calories }} kcal</span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ recipe.time }} min</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <RecipeDetail v-if="selectedRecipe" :is-open="isDetailOpen" :recipe="selectedRecipe" @close="isDetailOpen = false" />
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