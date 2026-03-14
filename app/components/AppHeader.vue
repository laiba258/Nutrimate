<script setup lang="ts">
const { user, isAdmin, isLoggedIn, logout } = useAuth()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Recipes', to: '/recipe' },
  { label: 'Zero Waste', to: '/zero-waste' },
  { label: 'Health Score', to: '/profile' },
]

function handleLogout() {
  logout()
  navigateTo('/')
}
</script>

<template>
  <header class="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
    <nav class="max-w-7xl mx-auto glass-effect rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="relative">
          <div class="absolute inset-0 bg-emerald-400 blur-lg opacity-40 group-hover:opacity-100 transition" />
          <div class="relative bg-emerald-600 p-2 rounded-xl shadow-inner">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-white" />
          </div>
        </div>
        <span class="text-2xl font-black tracking-tighter text-slate-900">NUTRI<span class="text-emerald-600">MATE</span></span>
      </NuxtLink>

      <!-- Nav links -->
      <div class="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative hover:text-emerald-600 transition-colors py-2 px-1 group"
        >
          {{ link.label }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
        </NuxtLink>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <!-- Guest -->
        <template v-if="!isLoggedIn">
          <UButton to="/login" variant="ghost" color="gray" size="sm" label="Sign In" class="font-bold" />
          <UButton to="/register" size="sm" class="bg-slate-900 hover:bg-emerald-600 text-white rounded-full px-5 font-black text-xs uppercase tracking-wider transition-all">
            Get Started
          </UButton>
        </template>

        <!-- Logged in -->
        <template v-else>
          <!-- Admin button — only for admins -->
          <UButton
            v-if="isAdmin"
            to="/admin"
            size="sm"
            class="bg-[#10b981] hover:bg-[#059669] rounded-full text-white px-5 font-black text-xs uppercase tracking-wider shadow-emerald-200 shadow-lg hover:shadow-emerald-300 transition-all"
          >
            <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4 mr-1" />
            Dashboard
          </UButton>

          <!-- User dropdown -->
          <UDropdown :items="[[
            { label: user?.name ?? 'Account', disabled: true },
            { label: 'My Profile', icon: 'i-heroicons-user', to: '/profile' },
            { label: 'Sign Out', icon: 'i-heroicons-arrow-right-on-rectangle', click: handleLogout },
          ]]">
            <button class="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all">
              <div class="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-black">
                {{ user?.name?.charAt(0).toUpperCase() }}
              </div>
              <span class="text-sm font-bold text-slate-700 hidden sm:block">{{ user?.name?.split(' ')[0] }}</span>
              <UIcon name="i-heroicons-chevron-down" class="w-3 h-3 text-slate-400" />
            </button>
          </UDropdown>
        </template>
      </div>
    </nav>
  </header>
</template>
