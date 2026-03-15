<template>
  <div class="group relative bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
    <div class="relative h-48 w-full overflow-hidden rounded-[1.5rem] mb-4">
      <img :src="image" :alt="title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute top-3 right-3">
        <span :class="badgeClass" class="rounded-full px-3 py-1 text-[10px] font-bold shadow-lg">
          {{ badgeText }}
        </span>
      </div>
    </div>

    <div class="px-2 space-y-3">
      <div class="flex justify-between items-start">
        <h4 class="font-bold text-slate-900 text-lg leading-tight">{{ title }}</h4>
        <div class="flex items-center gap-1 text-emerald-600">
          <UIcon name="i-heroicons-star-20-solid" class="w-4 h-4" />
          <span class="text-xs font-bold">4.8</span>
        </div>
      </div>

      <div class="flex gap-4 border-t border-slate-50 pt-3">
        <div v-for="macro in macros" :key="macro.label" class="text-center">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ macro.label }}</p>
          <p class="text-sm font-black text-slate-700">{{ macro.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  image: string
  badgeText: string
  badgeColor: string
  macros: { label: string; value: string }[]
}>()

const badgeClass = computed(() => ({
  'bg-teal-500 text-white': props.badgeColor === 'teal',
  'bg-emerald-500 text-white': props.badgeColor === 'emerald',
  'bg-blue-500 text-white': props.badgeColor === 'blue',
}))
</script>