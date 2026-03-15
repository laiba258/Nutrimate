<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })

const { user: currentUser } = useAuth()
const toast = useToast()

interface User { id: number; name: string; email: string; role: string; createdAt: string }
const users = ref<User[]>([])
const search = ref('')

const filtered = computed(() =>
  users.value.filter(u =>
    u.name?.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.value.toLowerCase())
  )
)

async function fetchUsers() {
  users.value = await $fetch<User[]>('/api/users')
}

async function toggleRole(u: User) {
  if (u.id === currentUser.value?.id) {
    toast.add({ title: "You can't change your own role", color: 'red' }); return
  }
  const newRole = u.role === 'admin' ? 'user' : 'admin'
  try {
    await $fetch(`/api/users/${u.id}`, { method: 'PATCH', body: { role: newRole } })
    toast.add({ title: `Role changed to ${newRole}` })
    await fetchUsers()
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

async function remove(u: User) {
  if (u.id === currentUser.value?.id) {
    toast.add({ title: "You can't delete yourself", color: 'red' }); return
  }
  if (!confirm('Delete this user?')) return
  try {
    await $fetch(`/api/users/${u.id}`, { method: 'DELETE' })
    toast.add({ title: 'User deleted' })
    await fetchUsers()
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p class="text-sm text-slate-400">{{ users.length }} total users</p>
      <input
        v-model="search"
        placeholder="Search users..."
        class="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
      >
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="filtered.length" class="divide-y divide-slate-50">
        <div v-for="u in filtered" :key="u.id" class="px-4 md:px-6 py-4 flex items-center gap-3 md:gap-4 hover:bg-slate-50 transition-colors">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
            :class="u.role === 'admin' ? 'bg-emerald-500' : 'bg-slate-400'"
          >
            {{ u.name?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="font-bold text-slate-800 text-sm">{{ u.name }}</p>
              <span v-if="u.id === currentUser?.id" class="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">You</span>
            </div>
            <p class="text-xs text-slate-400 truncate">{{ u.email }}</p>
            <p class="text-xs text-slate-300 mt-0.5 hidden sm:block">Joined {{ new Date(u.createdAt).toLocaleDateString() }}</p>
          </div>
          <span
            class="text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 hidden sm:inline"
            :class="u.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'"
          >{{ u.role }}</span>
          <div class="flex gap-1.5 shrink-0">
            <button
              class="text-xs font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
              :class="u.role === 'admin' ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'"
              :disabled="u.id === currentUser?.id"
              @click="toggleRole(u)"
            >
              <span class="hidden sm:inline">{{ u.role === 'admin' ? 'Make User' : 'Make Admin' }}</span>
              <UIcon :name="u.role === 'admin' ? 'i-heroicons-arrow-trending-down' : 'i-heroicons-arrow-trending-up'" class="w-4 h-4 sm:hidden" />
            </button>
            <button
              class="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all disabled:opacity-40"
              :disabled="u.id === currentUser?.id"
              @click="remove(u)"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div v-else class="py-20 text-center">
        <UIcon name="i-heroicons-users" class="w-12 h-12 text-slate-200 mx-auto mb-3" />
        <p class="text-slate-400">No users found.</p>
      </div>
    </div>
  </div>
</template>
