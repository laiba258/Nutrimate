<template>
  <div class="min-h-screen bg-gray-50 p-6 md:p-12">
    <header class="max-w-4xl mx-auto mb-10 text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-2">Zero-Waste Kitchen</h1>
      <p class="text-gray-600">Enter ingredients to get smart saving tips and recipe ideas.</p>
    </header>

    <main class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div class="flex gap-2 mb-4">
          <input 
            v-model="newIngredient" 
            type="text"
            placeholder="e.g. Lemon, Bread, Tomato..." 
            class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            @keyup.enter="addIngredient"
          >
          <button 
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            @click="addIngredient"
          >
            Add
          </button>
        </div>

        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(item, index) in ingredients" 
            :key="index"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium"
          >
            {{ item }}
            <button class="hover:text-red-500 font-bold" @click="removeIngredient(index)">×</button>
          </span>
        </div>
      </div>

      <div v-if="ingredients.length > 0" class="space-y-8">
        
        <section>
          <h2 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span>💡</span> Zero-Waste Tips
          </h2>
          <div class="grid grid-cols-1 gap-3">
            <div 
              v-for="tip in activeTips" 
              :key="tip.name"
              class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm"
            >
              <strong class="text-yellow-800 capitalize">{{ tip.name }}:</strong>
              <span class="text-yellow-900 ml-1">{{ tip.text }}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Matching Recipes</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="recipe in filteredRecipes" 
              :key="recipe.title"
              class="p-4 border rounded-xl bg-white hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div class="h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                {{ recipe.icon }}
              </div>
              <h3 class="font-bold text-gray-800">{{ recipe.title }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ recipe.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1">
                <span v-for="tag in recipe.tags" :key="tag" class="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <div v-else class="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <p class="text-gray-400">Add ingredients above to see the magic!</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const ingredients = ref([])
const newIngredient = ref('')

// 1. Data Bank for Tips
const wasteTipsLibrary = {
  lemon: "Don't toss the peels! Use them for zest in baking or soak them in vinegar for a natural kitchen cleaner.",
  bread: "Stale bread is perfect for homemade croutons or breadcrumbs. Just bake with a little olive oil.",
  tomato: "Overripe tomatoes are excellent for homemade pasta sauce or salsas where texture matters less.",
  potato: "Potato skins can be seasoned and baked into crispy chips. Never peel and waste again!",
  banana: "Black spots mean more sugar. Perfect for smoothies or banana bread."
}

// 2. Data Bank for Recipes
const recipeLibrary = [
  { title: "Lemon Curd Delight", tags: ['lemon'], icon: '🍋', description: "A creamy spread using fresh juice and zest." },
  { title: "Garlic Croutons", tags: ['bread'], icon: '🍞', description: "Crunchy toppings for your salads from old bread." },
  { title: "Zesty Tomato Pasta", tags: ['tomato', 'lemon'], icon: '🍝', description: "Rich sauce made from softened tomatoes." },
  { title: "Crispy Peel Chips", tags: ['potato'], icon: '🥔', description: "Roasted skins with sea salt and rosemary." }
]

// Logic to add/remove
const addIngredient = () => {
  if (newIngredient.value.trim()) {
    ingredients.value.push(newIngredient.value.trim().toLowerCase())
    newIngredient.value = ''
  }
}

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1)
}

// Computed: Filter tips based on added ingredients
const activeTips = computed(() => {
  return ingredients.value
    .filter(item => wasteTipsLibrary[item])
    .map(item => ({ name: item, text: wasteTipsLibrary[item] }))
})

// Computed: Filter recipes that match ANY of the added ingredients
const filteredRecipes = computed(() => {
  if (ingredients.value.length === 0) return []
  return recipeLibrary.filter(recipe => 
    recipe.tags.some(tag => ingredients.value.includes(tag))
  )
})
</script>