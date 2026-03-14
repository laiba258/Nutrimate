<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })
const { user, logout } = useAuth()
const toast = useToast()

const name = ref(user.value?.name ?? '')
const email = ref(user.value?.email ?? '')
const currentPassword = ref('')
const newPassword = ref('')

function saveProfile() {
  if (!name.value) { toast.add({ title: 'Name is required', color: 'red' }); return }
  const users = JSON.parse(localStorage.getItem('nutrimate_users') || '[]')
  const idx = users.findIndex((u: any) => u.id === user.value?.id)
  if (idx !== -1) {
    users[idx].name = name.value
    localStorage.setItem('nutrimate_users', JSON.stringify(users))
    localStorage.setItem('nutrimate_user', JSON.stringify({ ...user.value, name: name.value }))
    if (user.value) user.value.name = name.value
  }
  toast.add({ title: 'Profile updated', color: 'emerald' })
}

function changePassword() {
  if (!currentPassword.value || !newPassword.value) {
    toast.add({ title: 'Fill in both fields', color: 'red' }); return
  }
  const passwords = JSON.parse(localStorage.getItem('nutrimate_passwords') || '{}')
  if (passwords[user.value?.id ?? ''] !== currentPassword.value) {
    toast.add({ title: 'Current password is incorrect', color: 'red' }); return
  }
  passwords[user.value?.id ?? ''] = newPassword.value
  localStorage.setItem('nutrimate_passwords', JSON.stringify(passwords))
  currentPassword.value = ''
  newPassword.value = ''
  toast.add({ title: 'Password changed', color: 'emerald' })
}

function clearData(key: string, label: string) {
  if (!confirm(`Clear all ${label}? This cannot be undone.`)) return
  localStorage.removeItem(key)
  toast.add({ title: `${label} cleared`, color: 'emerald' })
}
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <!-- Profile -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <h3 class="font-black text-slate-900 tracking-tighter">Admin Profile</h3>
      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="Display Name">
          <UInput v-model="name" placeholder="Your name" />
        </UFormGroup>
        <UFormGroup label="Email">
          <UInput :model-value="email" disabled class="opacity-60" />
        </UFormGroup>
      </div>
      <div class="flex justify-end">
        <UButton color="emerald" label="Save Profile" @click="saveProfile" />
      </div>
    </div>

    <!-- Password -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <h3 class="font-black text-slate-900 tracking-tighter">Change Password</h3>
      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="Current Password">
          <UInput v-model="currentPassword" type="password" placeholder="••••••••" />
        </UFormGroup>
        <UFormGroup label="New Password">
          <UInput v-model="newPassword" type="password" placeholder="••••••••" />
        </UFormGroup>
      </div>
      <div class="flex justify-end">
        <UButton color="emerald" label="Update Password" @click="changePassword" />
      </div>
    </div>

    <!-- Danger zone -->
    <div class="bg-white rounded-2xl border border-red-100 shadow-sm p-6 space-y-4">
      <h3 class="font-black text-red-500 tracking-tighter">Danger Zone</h3>
      <div class="space-y-3">
        <div v-for="item in [
          { key: 'nutrimate_recipes', label: 'All Recipes' },
          { key: 'nutrimate_tips', label: 'All Tips' },
          { key: 'nutrimate_categories', label: 'All Categories' },
        ]" :key="item.key" class="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100">
          <p class="text-sm font-semibold text-slate-700">Clear {{ item.label }}</p>
          <UButton color="red" variant="soft" size="xs" :label="`Clear ${item.label}`" @click="clearData(item.key, item.label)" />
        </div>
      </div>
    </div>
  </div>
</template>
