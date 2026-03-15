<template>
  <footer class="bg-slate-900 pt-16 md:pt-20 pb-10 px-4 md:px-6 overflow-hidden relative mt-16 md:mt-20">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 relative z-10">
      <div class="sm:col-span-2 space-y-5">
        <div class="flex items-center gap-3 text-white">
          <div class="bg-emerald-500 p-2 rounded-lg">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-black tracking-tighter">NUTRIMATE</span>
        </div>
        <p class="text-slate-400 max-w-sm leading-relaxed text-sm">
          Revolutionizing how students and families approach nutrition. Sustainability in every bite, health in every meal.
        </p>
        <div class="flex gap-3">
          <a href="mailto:contact@nutrimate.com" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-all">
            <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-slate-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-all">
            <UIcon name="i-heroicons-camera" class="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>

      <!-- Platform links — visible to all -->
      <div>
        <h4 class="text-white font-black uppercase tracking-widest text-xs mb-5">Platform</h4>
        <ul class="space-y-3">
          <li v-for="link in platformLinks" :key="link.label">
            <NuxtLink :to="link.to" class="text-slate-500 hover:text-emerald-400 transition-colors font-medium text-sm">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Admin links — only visible to admins -->
      <div v-if="isAdmin">
        <h4 class="text-white font-black uppercase tracking-widest text-xs mb-5">Admin</h4>
        <ul class="space-y-3">
          <li v-for="link in adminLinks" :key="link.label">
            <NuxtLink :to="link.to" class="text-slate-500 hover:text-emerald-400 transition-colors font-medium text-sm">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-slate-500 font-medium text-sm">© 2026 NutriMate. All Rights Reserved.</p>
      <div class="flex flex-wrap items-center justify-center gap-2">
        <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">SDG 2: Zero Hunger</span>
        <span class="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-bold">SDG 12: Responsible Consumption</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { isAdmin } = useAuth()

const platformLinks = [
  { label: 'Browse Recipes', to: '/recipe' },
  { label: 'Health Score', to: '/profile' },
  { label: 'Zero Waste Tips', to: '/zero-waste' },
  { label: 'Register', to: '/register' },
  { label: 'Login', to: '/login' },
]

const adminLinks = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Manage Recipes', to: '/admin/recipes' },
  { label: 'Manage Users', to: '/admin/users' },
  { label: 'Zero Waste Tips', to: '/admin/tips' },
  { label: 'Settings', to: '/admin/settings' },
]
</script>
