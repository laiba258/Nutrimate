<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Recipes', to: '/recipe' },
  { label: 'Zero Waste', to: '/zero-waste' },
  { label: 'Health Score', to: '/profile' }
]
</script>
<template>
  <header class="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
    <nav class="max-w-7xl mx-auto glass-effect rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="relative">
          <div class="absolute inset-0 bg-emerald-400 blur-lg opacity-40 group-hover:opacity-100 transition"/>
          <div class="relative bg-emerald-600 p-2 rounded-xl shadow-inner">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-white" />
          </div>
        </div>
        <span class="text-2xl font-black tracking-tighter text-slate-900">NUTRI<span class="text-emerald-600">MATE</span></span>
      </NuxtLink>

      <div class="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
        <NuxtLink
v-for="link in navLinks" :key="link.to" :to="link.to" 
          class="relative hover:text-emerald-600 transition-colors py-2 px-1 group">
          {{ link.label }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"/>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <UButton  variant="ghost" icon="i-heroicons-magnifying-glass" class="text-[#10b981] hover:text-[#059669]  rounded-full" />
        <UButton to="/admin/"  size="lg" class="bg-[#10b981] hover:bg-[#059669] rounded-full text-white px-6 font-bold shadow-emerald-200 shadow-lg hover:shadow-emerald-300 transition-all">
          Admin Portal
        </UButton>
      </div>
    </nav>
  </header>
</template>

