<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })
const { user } = useAuth()
const toast = useToast()

const name = ref(user.value?.name ?? '')
const email = ref(user.value?.email ?? '')
const currentPassword = ref('')
const newPassword = ref('')

async function saveProfile() {
  if (!name.value) { toast.add({ title: 'Name is required', color: 'red' }); return }
  try {
    await $fetch('/api/auth/update-profile', { method: 'POST', body: { name: name.value } })
    if (user.value) user.value.name = name.value
    toast.add({ title: 'Profile updated' })
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

async function changePassword() {
  if (!currentPassword.value || !newPassword.value) {
    toast.add({ title: 'Fill in both fields', color: 'red' }); return
  }
  try {
    await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: { currentPassword: currentPassword.value, newPassword: newPassword.value },
    })
    currentPassword.value = ''
    newPassword.value = ''
    toast.add({ title: 'Password changed' })
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <!-- Profile -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
      <h3 class="font-black text-slate-900 tracking-tighter">Admin Profile</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Display Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
          >
        </div>
        <div class="space-y-1.5">
          <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</label>
          <input
            :value="email"
            type="email"
            disabled
            class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-400 bg-slate-50 cursor-not-allowed"
          >
        </div>
      </div>
      <div class="flex justify-end">
        <button
          class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all"
          @click="saveProfile"
        >
          Save Profile
        </button>
      </div>
    </div>

    <!-- Password -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
      <h3 class="font-black text-slate-900 tracking-tighter">Change Password</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Current Password</label>
          <input
            v-model="currentPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
          >
        </div>
        <div class="space-y-1.5">
          <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">New Password</label>
          <input
            v-model="newPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
          >
        </div>
      </div>
      <div class="flex justify-end">
        <button
          class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all"
          @click="changePassword"
        >
          Update Password
        </button>
      </div>
    </div>
  </div>
</template>
