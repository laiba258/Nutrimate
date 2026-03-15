<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })

const { getUsers } = useAuth()

// Local recipe store
const getRecipes = () => JSON.parse(localStorage.getItem('nutrimate_recipes') || '[]')

const recipes = ref(getRecipes())
const users = ref(getUsers())

const stats = computed(() => [
  { label: 'Total Recipes', value: recipes.value.length, icon: 'i-heroicons-book-open', color: 'emerald', change: '+3 this week' },
  { label: 'Registered Users', value: users.value.length, icon: 'i-heroicons-users', color: 'blue', change: 'All time' },
  { label: 'Zero Waste', value: recipes.value.filter((r: any) => r.isZeroWaste).length, icon: 'i-heroicons-leaf', color: 'teal', change: 'Recipes tagged' },
  { label: 'Low Budget', value: recipes.value.filter((r: any) => r.costLevel === 'Low').length, icon: 'i-heroicons-banknotes', color: 'orange', change: 'Affordable picks' },
])

const recentRecipes = computed(() => [...recipes.value].reverse().slice(0, 5))
const recentUsers = computed(() => [...users.value].reverse().slice(0, 5))
</script>

<template>
  <div class="space-y-8">
    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="p-2.5 rounded-xl bg-emerald-50">
            <UIcon :name="stat.icon" class="w-5 h-5 text-emerald-500" />
          </div>
          <span class="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{{ stat.change }}</span>
        </div>
        <p class="text-3xl font-black text-slate-900">{{ stat.value }}</p>
        <p class="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">{{ stat.label }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Recent Recipes -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
          <h3 class="font-black text-slate-900 tracking-tighter">Recent Recipes</h3>
          <UButton to="/admin/recipes" variant="ghost" color="gray" size="xs" label="View all" trailing-icon="i-heroicons-arrow-right" />
        </div>
        <div v-if="recentRecipes.length" class="divide-y divide-slate-50">
          <div v-for="r in recentRecipes" :key="r.id" class="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <UIcon name="i-heroicons-book-open" class="w-5 h-5 text-emerald-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-slate-800 text-sm truncate">{{ r.title }}</p>
              <p class="text-xs text-slate-400">{{ r.costLevel ?? '—' }} · {{ r.cookingTime ? r.cookingTime + ' min' : '—' }}</p>
            </div>
            <UBadge :class="r.isZeroWaste ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'" variant="subtle" size="xs">
              {{ r.isZeroWaste ? 'Zero Waste' : r.costLevel ?? '—' }}
            </UBadge>
          </div>
        </div>
        <div v-else class="px-6 py-12 text-center">
          <UIcon name="i-heroicons-book-open" class="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p class="text-sm text-slate-400">No recipes yet. <NuxtLink to="/admin/recipes" class="text-emerald-500 font-bold">Add one</NuxtLink></p>
        </div>
      </div>

      <!-- Recent Users -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
          <h3 class="font-black text-slate-900 tracking-tighter">Recent Users</h3>
          <UButton to="/admin/users" variant="ghost" color="gray" size="xs" label="View all" trailing-icon="i-heroicons-arrow-right" />
        </div>
        <div v-if="recentUsers.length" class="divide-y divide-slate-50">
          <div v-for="u in recentUsers" :key="u.id" class="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-sm shrink-0">
              {{ u.name?.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-slate-800 text-sm truncate">{{ u.name }}</p>
              <p class="text-xs text-slate-400 truncate">{{ u.email }}</p>
            </div>
            <UBadge :class="u.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'" variant="subtle" size="xs">
              {{ u.role }}
            </UBadge>
          </div>
        </div>
        <div v-else class="px-6 py-12 text-center">
          <p class="text-sm text-slate-400">No users yet.</p>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 class="font-black text-slate-900 tracking-tighter mb-5">Quick Actions</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <NuxtLink
          v-for="action in [
            { label: 'Add Recipe', icon: 'i-heroicons-plus-circle', to: '/admin/recipes?add=true', color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
            { label: 'Manage Users', icon: 'i-heroicons-users', to: '/admin/users', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
            { label: 'Add Tip', icon: 'i-heroicons-light-bulb', to: '/admin/tips?add=true', color: 'bg-teal-50 text-teal-600 hover:bg-teal-100' },
            { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/admin/settings', color: 'bg-slate-50 text-slate-600 hover:bg-slate-100' },
          ]"
          :key="action.label"
          :to="action.to"
          class="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all text-center"
          :class="action.color"
        >
          <UIcon :name="action.icon" class="w-7 h-7" />
          <span class="text-xs font-black uppercase tracking-wider">{{ action.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
