<template>
  <footer class="bg-slate-900 pt-20 pb-10 px-6 overflow-hidden relative mt-20">
    <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 to-teal-500"/>
    
    <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
      <div class="col-span-2 space-y-6">
        <div class="flex items-center gap-3 text-white">
          <div class="bg-emerald-500 p-2 rounded-lg">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6" />
          </div>
          <span class="text-2xl font-black tracking-tighter">NUTRIMATE</span>
        </div>
        <p class="text-slate-400 max-w-sm leading-relaxed text-lg">
          Revolutionizing how students and families approach nutrition. Sustainability in every bite, health in every meal.
        </p>
        <div class="flex gap-4">
          <UButton color="white" variant="ghost" icon="i-heroicons-envelope" class="rounded-full bg-white/5" />
          <UButton color="white" variant="ghost" icon="i-heroicons-camera" class="rounded-full bg-white/5" />
        </div>
      </div>

      <div v-for="col in footerLinks" :key="col.title">
        <h4 class="text-white font-black uppercase tracking-widest text-sm mb-6">{{ col.title }}</h4>
        <ul class="space-y-4">
          <li v-for="link in col.links" :key="link.label">
            <NuxtLink :to="link.to" class="text-slate-500 hover:text-emerald-400 transition-colors font-medium">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-7xl mx-auto border-t border-slate-800 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <p class="text-slate-500 font-medium">© 2026 NutriMate Project. All Rights Reserved.</p>
      <div class="flex items-center gap-4">
        <UBadge color="emerald" variant="subtle" class="bg-emerald-100 text-emerald-700 px-3 py-1">SDG 2: Zero Hunger</UBadge>
        <UBadge color="teal" variant="subtle" class="bg-teal-100 text-teal-700 px-3 py-1">SDG 12: Responsible Consumption</UBadge>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { 
    title: 'Platform', 
    links: [
      { label: 'Browse Recipes', to: '/recipes' },
      { label: 'Macro Calculator', to: '/profile' },
      { label: 'Zero Waste Tips', to: '/zero-waste' }
    ] 
  },
  { 
    title: 'Project', 
    links: [
      { label: 'FYP Proposal', to: '#' },
      { label: 'System Design', to: '#' },
      { label: 'Admin Access', to: '/admin' }
    ] 
  }
]
</script>