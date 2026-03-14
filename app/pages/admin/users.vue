<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })

const { getUsers, updateUserRole, deleteUser, user: currentUser } = useAuth()
const toast = useToast()

const users = ref(getUsers())
const search = ref('')

const filtered = computed(() =>
  users.value.filter(u =>
    u.name?.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.value.toLowerCase())
  )
)

function toggleRole(id: string, current: string) {
  if (id === currentUser.value?.id) {
    toast.add({ title: "You can't change your own role", color: 'red' })
    return
  }
  const newRole = current === 'admin' ? 'user' : 'admin'
  updateUserRole(id, newRole)
  users.value = getUsers()
  toast.add({ title: `Role changed to ${newRole}`, color: 'emerald' })
}

function remove(id: string) {
  if (id === currentUser.value?.id) {
    toast.add({ title: "You can't delete yourself", color: 'red' })
    return
  }
  if (!confirm('Delete this user?')) return
  deleteUser(id)
  users.value = getUsers()
  toast.add({ title: 'User deleted', color: 'emerald' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-400">{{ users.length }} total users</p>
      </div>
      <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search users..." class="w-64" />
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="filtered.length" class="divide-y divide-slate-50">
        <div v-for="u in filtered" :key="u.id" class="px-6 py-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
            :class="u.role === 'admin' ? 'bg-emerald-500' : 'bg-slate-400'">
            {{ u.name?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-bold text-slate-800">{{ u.name }}</p>
              <UBadge v-if="u.id === currentUser?.id" color="blue" variant="subtle" size="xs">You</UBadge>
            </div>
            <p class="text-sm text-slate-400 truncate">{{ u.email }}</p>
            <p class="text-xs text-slate-300 mt-0.5">Joined {{ new Date(u.createdAt).toLocaleDateString() }}</p>
          </div>
          <UBadge :color="u.role === 'admin' ? 'emerald' : 'slate'" variant="subtle">{{ u.role }}</UBadge>
          <div class="flex gap-2">
            <UButton
              size="xs"
              :color="u.role === 'admin' ? 'orange' : 'emerald'"
              variant="soft"
              :label="u.role === 'admin' ? 'Make User' : 'Make Admin'"
              :disabled="u.id === currentUser?.id"
              @click="toggleRole(u.id, u.role)"
            />
            <UButton
              size="xs"
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              :disabled="u.id === currentUser?.id"
              @click="remove(u.id)"
            />
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
