<template>
  <div class="min-h-screen bg-[#FCFCFC] pb-32">

    <!-- Hero -->
    <div class="relative pt-32 pb-20 px-6 text-center overflow-hidden">
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

    <div class="max-w-4xl mx-auto px-6 space-y-10">

      <!-- Input -->
      <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 space-y-5">
        <div class="flex gap-3">
          <input
            v-model="newIngredient"
            type="text"
            placeholder="e.g. Lemon, Bread, Tomato..."
            class="flex-1 px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            @keyup.enter="addIngredient"
          >
          <button
            class="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-100"
            @click="addIngredient"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(item, index) in ingredients"
            :key="index"
            class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-semibold"
          >
            {{ item }}
            <button class="hover:text-red-500 transition-colors font-black text-base leading-none" @click="removeIngredient(index)">×</button>
          </span>
        </div>
      </div>

      <!-- Results -->
      <div v-if="ingredients.length > 0" class="space-y-10">

        <!-- Tips -->
        <div v-if="activeTips.length > 0" class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 ml-2">Zero-Waste Tips</p>
          <div class="grid gap-4">
            <div
              v-for="tip in activeTips"
              :key="tip.name"
              class="bg-white rounded-[2rem] border border-slate-100 p-6 flex gap-5 shadow-sm"
            >
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p class="font-black text-slate-900 capitalize tracking-tight">{{ tip.name }}</p>
                <p class="text-sm text-slate-500 mt-1 leading-relaxed">{{ tip.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Matching Recipes -->
        <div v-if="filteredRecipes.length > 0" class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 ml-2">Matching Recipes</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="recipe in filteredRecipes"
              :key="recipe.title"
              class="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
            >
              <div class="h-36 bg-emerald-50 rounded-2xl mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
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

        <div v-if="activeTips.length === 0 && filteredRecipes.length === 0" class="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
          <UIcon name="i-heroicons-magnifying-glass" class="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p class="text-slate-400 font-medium text-sm">No tips found for these ingredients yet.</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
        <UIcon name="i-heroicons-leaf" class="w-12 h-12 text-emerald-200 mx-auto mb-4" />
        <p class="text-slate-400 font-medium">Add ingredients above to see the magic.</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const ingredients = ref<string[]>([])
const newIngredient = ref('')

const wasteTipsLibrary: Record<string, string> = {
  lemon: "Don't toss the peels! Use them for zest in baking or soak in vinegar for a natural kitchen cleaner.",
  bread: "Stale bread is perfect for homemade croutons or breadcrumbs. Just bake with a little olive oil.",
  tomato: "Overripe tomatoes are excellent for homemade pasta sauce or salsas where texture matters less.",
  potato: "Potato skins can be seasoned and baked into crispy chips. Never peel and waste again!",
  banana: "Black spots mean more sugar. Perfect for smoothies or banana bread.",
  egg: "Eggshells are rich in calcium — crush and add to soil as fertilizer for your plants.",
  onion: "Onion skins make a rich, golden broth. Simmer with water for 20 mins and strain.",
  spinach: "Wilted spinach is perfect for smoothies, soups, or sautéed as a side — still full of nutrients.",
  rice: "Leftover rice makes the best fried rice. Day-old rice fries crispier than fresh.",
  pasta: "Save pasta water — it's starchy gold for thickening sauces and making them cling to pasta.",
  chicken: "Boil chicken bones for 4+ hours to make a rich, collagen-packed bone broth.",
  apple: "Apple cores and peels can be simmered with cinnamon and sugar to make apple jelly.",
  carrot: "Carrot tops are edible! Use them in pesto, chimichurri, or as a garnish.",
  ginger: "Freeze ginger root and grate it directly from frozen — no peeling needed.",
  coffee: "Used coffee grounds are excellent as a natural exfoliant or garden fertilizer.",
}

const recipeLibrary = [
  { title: 'Lemon Curd Delight', tags: ['lemon'], icon: '🍋', description: 'A creamy spread using fresh juice and zest.' },
  { title: 'Garlic Croutons', tags: ['bread'], icon: '🍞', description: 'Crunchy toppings for your salads from old bread.' },
  { title: 'Zesty Tomato Pasta', tags: ['tomato', 'pasta'], icon: '🍝', description: 'Rich sauce made from softened tomatoes.' },
  { title: 'Crispy Peel Chips', tags: ['potato'], icon: '🥔', description: 'Roasted skins with sea salt and rosemary.' },
  { title: 'Banana Bread', tags: ['banana'], icon: '🍌', description: 'Moist and sweet loaf from overripe bananas.' },
  { title: 'Egg Fried Rice', tags: ['egg', 'rice'], icon: '🍳', description: 'Classic fried rice with day-old rice and eggs.' },
  { title: 'Bone Broth Soup', tags: ['chicken'], icon: '🍲', description: 'Nutrient-dense broth from chicken bones.' },
  { title: 'Carrot Top Pesto', tags: ['carrot'], icon: '🥕', description: 'Vibrant pesto from carrot greens and olive oil.' },
  { title: 'Spinach Smoothie', tags: ['spinach', 'banana'], icon: '🥤', description: 'Wilted spinach blended into a green power drink.' },
  { title: 'Onion Skin Broth', tags: ['onion'], icon: '🧅', description: 'Golden broth from onion skins — zero waste base.' },
]

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

const activeTips = computed(() =>
  ingredients.value
    .filter(item => wasteTipsLibrary[item])
    .map(item => ({ name: item, text: wasteTipsLibrary[item] }))
)

const filteredRecipes = computed(() => {
  if (!ingredients.value.length) return []
  return recipeLibrary.filter(recipe =>
    recipe.tags.some(tag => ingredients.value.includes(tag))
  )
})
</script>