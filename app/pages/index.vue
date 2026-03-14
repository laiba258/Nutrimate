<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const steps = [
  { number: '01', title: 'Profile Logic', description: 'Analyze BMI and activity for a macro-blueprint.', icon: 'i-heroicons-finger-print' },
  { number: '02', title: 'Smart Budget', description: 'Weekly limits and smart kitchen math.', icon: 'i-heroicons-adjustments-horizontal' },
  { number: '03', title: 'Zero Waste', description: 'Use every last scrap in your pantry.', icon: 'i-heroicons-leaf' }
]

const trendingRecipes = [
  { title: 'Avocado Seed Toast', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500', badgeText: 'Low Budget', badgeColor: 'emerald', calories: 320, time: 15, macros: [{ label: 'Kcal', value: '320' }, { label: 'Prot', value: '12g' }, { label: 'Fat', value: '18g' }] },
  { title: 'Vibrant Berry Bowl', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=500', badgeText: 'High Fiber', badgeColor: 'blue', calories: 280, time: 10, macros: [{ label: 'Kcal', value: '280' }, { label: 'Prot', value: '6g' }, { label: 'Fat', value: '4g' }] },
  { title: 'Green Power Stir', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500', badgeText: 'Zero Waste', badgeColor: 'teal', calories: 210, time: 12, macros: [{ label: 'Kcal', value: '210' }, { label: 'Prot', value: '8g' }, { label: 'Fat', value: '5g' }] }
]

// Function to redirect to recipes page with filter open
const openFiltersOnRecipes = () => {
  router.push({ path: '/recipe', query: { openFilter: 'true' } })
}
</script>

<template>
  <div class="bg-[#FCFCFC] selection:bg-emerald-100 min-h-screen relative">
    
    <HomeHero />

    <div class="fixed bottom-10 right-10 z-50">
      <button class="group relative flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-110 active:scale-95 transition-all" @click="openFiltersOnRecipes">
        <div class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 group-hover:hidden" />
        <UIcon name="i-heroicons-adjustments-horizontal-20-solid" class="w-7 h-7" />
        <span class="absolute -top-12 right-0 bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none whitespace-nowrap">Open Filters</span>
      </button>
    </div>

    <section class="max-w-7xl mx-auto px-6 py-32 relative">
      <div class="text-center mb-24 space-y-4">
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
          The Simple <span class="text-[#10b981] italic font-serif font-light lowercase">Process.</span>
        </h2>
        <div class="w-12 h-1 bg-emerald-500 mx-auto rounded-full"/>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        <ProcessCard v-for="(step, index) in steps" :key="index" v-bind="step" />
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-24 bg-white rounded-[4rem] mb-24 border border-slate-50 shadow-sm relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-4 relative z-10">
        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Curated for you</p>
          <h2 class="text-4xl font-black text-slate-900 tracking-tighter leading-none">Smart Picks.</h2>
        </div>
        <UButton to="/recipes" variant="ghost" color="gray" class="text-[10px] font-black uppercase tracking-widest hover:text-emerald-600">
          View all 40+ Recipes
        </UButton>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        <RecipePreviewCard v-for="recipe in trendingRecipes" :key="recipe.title" v-bind="recipe" />
      </div>
    </section>
    
    <section class="max-w-7xl mx-auto px-6 mb-32">
      <div class="relative overflow-hidden rounded-[4rem] bg-emerald-50/50 p-12 md:p-24 border border-emerald-100/50 text-center space-y-10">
        <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Stay Healthy, <span class="text-emerald-500 italic font-serif">Stay Updated.</span></h2>
        <form class="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 max-w-xl mx-auto" @submit.prevent>
          <input type="email" placeholder="Your email address" class="flex-1 bg-transparent px-6 py-4 outline-none text-slate-600 text-sm font-medium">
          <button class="bg-slate-900 hover:bg-[#10b981] text-white rounded-2xl px-10 py-4 font-black text-[11px] uppercase tracking-widest transition-all">Subscribe</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap');
.font-serif { font-family: 'Cormorant+Garamond', serif; }
</style>