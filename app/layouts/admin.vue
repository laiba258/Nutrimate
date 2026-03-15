<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()
const sidebarOpen = ref(false)

const navItems = [
  { label: 'Overview', icon: 'i-heroicons-squares-2x2', to: '/admin' },
  { label: 'Recipes', icon: 'i-heroicons-book-open', to: '/admin/recipes' },
  { label: 'Ingredients', icon: 'i-heroicons-beaker', to: '/admin/ingredients' },
  { label: 'Categories', icon: 'i-heroicons-tag', to: '/admin/categories' },
  { label: 'Zero Waste Tips', icon: 'i-heroicons-light-bulb', to: '/admin/tips' },
  { label: 'Users', icon: 'i-heroicons-users', to: '/admin/users' },
  { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/admin/settings' },
]

function handleLogout() {
  logout()
  navigateTo('/login')
}

const isActive = (to: string) => {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}

const currentLabel = computed(() => navItems.find(n => isActive(n.to))?.label ?? 'Dashboard')

// Close sidebar on route change
watch(() => route.path, () => { sidebarOpen.value = false })
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex overflow-hidden">

    <!-- Mobile overlay -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 h-full w-64 bg-slate-900 flex flex-col z-40 transition-transform duration-300"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-slate-800 shrink-0">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="bg-emerald-500 p-1.5 rounded-lg">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-white" />
          </div>
          <span class="text-lg font-black tracking-tighter text-white">NUTRI<span class="text-emerald-400">MATE</span></span>
        </NuxtLink>
        <div class="mt-2">
          <span class="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">Admin Panel</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
          :class="isActive(item.to)
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- User -->
      <div class="px-4 py-4 border-t border-slate-800 shrink-0">
        <div class="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-800">
          <div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-black shrink-0">
            {{ user?.name?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-white truncate">{{ user?.name }}</p>
            <p class="text-[10px] text-emerald-400 font-black uppercase tracking-wider">Admin</p>
          </div>
          <button class="text-slate-500 hover:text-white transition-colors" title="Sign out" @click="handleLogout">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 lg:ml-64 flex flex-col min-w-0">
      <!-- Top bar -->
      <header class="bg-white border-b border-slate-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
        <div class="flex items-center gap-3">
          <!-- Hamburger (mobile only) -->
          <button
            class="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all"
            @click="sidebarOpen = !sidebarOpen"
          >
            <UIcon name="i-heroicons-bars-3" class="w-5 h-5 text-slate-700" />
          </button>
          <div>
            <h1 class="text-base md:text-lg font-black text-slate-900 tracking-tighter">{{ currentLabel }}</h1>
            <p class="text-xs text-slate-400 hidden sm:block">NutriMate Admin Panel</p>
          </div>
        </div>
        <NuxtLink
          to="/"
          target="_blank"
          class="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-50"
        >
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
          <span class="hidden sm:inline">View Site</span>
        </NuxtLink>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 md:p-8 min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
