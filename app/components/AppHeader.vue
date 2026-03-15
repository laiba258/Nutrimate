<script setup lang="ts">
const { user, isAdmin, isLoggedIn, logout } = useAuth()
const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const router = useRouter()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Recipes', to: '/recipe' },
  { label: 'Zero Waste', to: '/zero-waste' },
  { label: 'Health Score', to: '/profile' },
]

async function handleLogout() {
  mobileMenuOpen.value = false
  await logout()
  navigateTo('/')
}

function submitSearch() {
  if (!searchQuery.value.trim()) return
  router.push({ path: '/recipe', query: { search: searchQuery.value.trim() } })
  searchQuery.value = ''
  searchOpen.value = false
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
    <nav class="max-w-7xl mx-auto glass-effect rounded-2xl px-4 md:px-6 py-3 flex justify-between items-center shadow-lg">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group shrink-0">
        <div class="relative">
          <div class="absolute inset-0 bg-emerald-400 blur-lg opacity-40 group-hover:opacity-100 transition" />
          <div class="relative bg-emerald-600 p-2 rounded-xl shadow-inner">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-white" />
          </div>
        </div>
        <span class="text-xl font-black tracking-tighter text-slate-900">NUTRI<span class="text-emerald-600">MATE</span></span>
      </NuxtLink>

      <!-- Desktop Nav links -->
      <div class="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative hover:text-emerald-600 transition-colors py-2 px-1 group"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
        </NuxtLink>
      </div>

      <!-- Desktop Right actions -->
      <div class="hidden lg:flex items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 w-0" enter-to-class="opacity-100 w-48" leave-active-class="transition-all duration-150" leave-from-class="opacity-100 w-48" leave-to-class="opacity-0 w-0">
            <form v-if="searchOpen" class="flex items-center" @submit.prevent="submitSearch">
              <input v-model="searchQuery" type="text" placeholder="Search recipes..." autofocus
                class="w-48 px-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white"
                @blur="!searchQuery && (searchOpen = false)">
            </form>
          </Transition>
          <button class="p-2 rounded-xl hover:bg-slate-100 transition-all text-slate-500 hover:text-emerald-600" @click="searchOpen ? submitSearch() : (searchOpen = true)">
            <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
          </button>
        </div>
        <template v-if="!isLoggedIn">
          <NuxtLink to="/login" class="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors px-3 py-2">Sign In</NuxtLink>
          <NuxtLink to="/register" class="bg-slate-900 hover:bg-emerald-600 text-white rounded-full px-5 py-2 font-black text-xs uppercase tracking-wider transition-all">
            Get Started
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink
            v-if="isAdmin"
            to="/admin"
            class="bg-[#10b981] hover:bg-[#059669] rounded-full text-white px-5 py-2 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-1"
          >
            <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
            Dashboard
          </NuxtLink>
          <UDropdownMenu :items="[
            [{ label: user?.name ?? 'Account', disabled: true }],
            [
              { label: 'My Profile', icon: 'i-heroicons-user', to: '/profile' },
              { label: 'Sign Out', icon: 'i-heroicons-arrow-right-on-rectangle', onSelect: handleLogout },
            ]
          ]">
            <button class="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all">
              <div class="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-black">
                {{ user?.name?.charAt(0).toUpperCase() }}
              </div>
              <span class="text-sm font-bold text-slate-700">{{ user?.name?.split(' ')[0] }}</span>
              <UIcon name="i-heroicons-chevron-down" class="w-3 h-3 text-slate-400" />
            </button>
          </UDropdownMenu>
        </template>
      </div>

      <!-- Mobile: right side -->
      <div class="flex lg:hidden items-center gap-2">
        <template v-if="!isLoggedIn">
          <NuxtLink to="/login" class="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors px-2 py-1">Sign In</NuxtLink>
        </template>
        <template v-else>
          <div class="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-black">
            {{ user?.name?.charAt(0).toUpperCase() }}
          </div>
        </template>
        <!-- Hamburger -->
        <button
          class="p-2 rounded-xl hover:bg-slate-100 transition-all"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden mt-2 max-w-7xl mx-auto glass-effect rounded-2xl shadow-lg overflow-hidden">
        <!-- Mobile search -->
        <div class="px-4 pt-4">
          <form class="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200" @submit.prevent="submitSearch">
            <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-slate-400 shrink-0" />
            <input v-model="searchQuery" type="text" placeholder="Search recipes..." class="flex-1 bg-transparent text-sm outline-none text-slate-700 placeholder-slate-400">
          </form>
        </div>
        <div class="px-4 py-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
        <div class="border-t border-slate-100 px-4 py-4 space-y-2">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all" @click="mobileMenuOpen = false">Sign In</NuxtLink>
            <NuxtLink to="/register" class="block w-full text-center bg-slate-900 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all" @click="mobileMenuOpen = false">Get Started</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink v-if="isAdmin" to="/admin" class="block w-full text-center bg-[#10b981] text-white px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider" @click="mobileMenuOpen = false">Dashboard</NuxtLink>
            <NuxtLink to="/profile" class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all" @click="mobileMenuOpen = false">My Profile</NuxtLink>
            <button class="block w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all" @click="handleLogout">Sign Out</button>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>
