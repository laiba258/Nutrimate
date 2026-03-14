<template>
  <Transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-[60] flex justify-end">
      <div class="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" @click="$emit('close')"/>

      <div class="relative w-full max-w-xl bg-white h-screen shadow-2xl overflow-y-auto no-scrollbar">
        <button class="absolute top-8 right-8 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-emerald-600 flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:text-white transition-all" @click="$emit('close')">
          <UIcon name="i-lucide-x" class="w-5 h-5" />
        </button>

        <div class="relative h-[40vh] w-full">
          <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"/>
        </div>

        <div class="px-10 pb-20 -mt-20 relative z-10 space-y-10">
          <div class="space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              {{ recipe.category }}
            </span>
            <h2 class="text-5xl font-black text-slate-900 tracking-tighter leading-none">{{ recipe.title }}</h2>
          </div>

          <div class="grid grid-cols-3 gap-4 border-y border-slate-50 py-8">
            <div v-for="stat in stats" :key="stat.label" class="text-center space-y-1">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{{ stat.label }}</p>
              <p class="text-xl font-black text-slate-900">{{ stat.value }}</p>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="text-lg font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
              <span class="w-8 h-[2px] bg-emerald-500"/> Ingredients
            </h4>
            <ul class="space-y-4">
              <li v-for="ing in recipe.ingredients" :key="ing" class="flex items-center gap-4 text-sm font-medium text-slate-600 group">
                <div class="w-2 h-2 rounded-full border-2 border-emerald-400 group-hover:bg-emerald-400 transition-all"/>
                {{ ing }}
              </li>
            </ul>
          </div>

          <div class="space-y-8">
            <h4 class="text-lg font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
              <span class="w-8 h-[2px] bg-emerald-500"/> Instructions
            </h4>
            <div class="space-y-8 relative">
              <div class="absolute left-[19px] top-2 bottom-2 w-[2px] bg-slate-50"/>
              <div v-for="(step, index) in recipe.instructions" :key="index" class="relative flex gap-6">
                <div class="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                  0{{ index + 1 }}
                </div>
                <p class="pt-2 text-sm font-medium leading-relaxed text-slate-500">{{ step }}</p>
              </div>
            </div>
          </div>

          <div v-if="recipe.hack" class="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"/>
            <div class="relative z-10 space-y-3">
              <div class="flex items-center gap-2 text-emerald-400">
                <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
                <span class="text-[10px] font-black uppercase tracking-widest">Zero Waste Hack</span>
              </div>
              <p class="text-sm font-medium leading-relaxed opacity-90 italic">
                "{{ recipe.hack }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Recipe {
  title: string
  image: string
  category: string
  protein?: string
  carbs?: string
  fats?: string
  ingredients: string[]
  instructions: string[]
  hack?: string
}

const props = defineProps<{
  isOpen: boolean
  recipe: Recipe
}>()

defineEmits<{ close: [] }>()

const stats = computed(() => [
  { label: 'Protein', value: props.recipe?.protein || '0g' },
  { label: 'Carbs', value: props.recipe?.carbs || '0g' },
  { label: 'Fats', value: props.recipe?.fats || '0g' }
])
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.slide-enter-active, .slide-leave-active {
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>