<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: false })

const { register, isLoggedIn } = useAuth()
if (isLoggedIn.value) navigateTo('/')

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 300))
  const result = register(name.value, email.value, password.value)
  if (result.success) {
    await navigateTo('/')
  } else {
    error.value = result.error ?? 'Registration failed'
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#FCFCFC] flex">
    <!-- Left panel -->
    <div class="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-16 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>
      <NuxtLink to="/" class="flex items-center gap-3 relative z-10">
        <div class="bg-emerald-500 p-2 rounded-xl">
          <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-white" />
        </div>
        <span class="text-2xl font-black tracking-tighter text-white">NUTRI<span class="text-emerald-400">MATE</span></span>
      </NuxtLink>
      <div class="relative z-10 space-y-6">
        <h2 class="text-5xl font-black text-white tracking-tighter leading-tight">
          Start your<br><span class="text-emerald-400 italic font-serif font-light">journey.</span>
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
          First person to register becomes the admin. No setup needed.
        </p>
        <div class="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
          <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-emerald-400 shrink-0" />
          <p class="text-xs text-slate-300">First registered account gets full admin access automatically.</p>
        </div>
      </div>
      <p class="text-slate-600 text-xs relative z-10">© 2026 NutriMate. All rights reserved.</p>
    </div>

    <!-- Right panel -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-sm space-y-8">
        <div class="space-y-2">
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter">Create account.</h1>
          <p class="text-sm text-slate-400">Join NutriMate and start eating smarter.</p>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <div class="space-y-3">
            <div>
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Full Name</label>
              <input v-model="name" type="text" required placeholder="Your name"
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all">
            </div>
            <div>
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Email</label>
              <input v-model="email" type="email" required placeholder="you@example.com"
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all">
            </div>
            <div>
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Password</label>
              <input v-model="password" type="password" required placeholder="Min. 6 characters"
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all">
            </div>
            <div>
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Confirm Password</label>
              <input v-model="confirm" type="password" required placeholder="••••••••"
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all">
            </div>
          </div>

          <p v-if="error" class="text-xs text-red-500 font-medium bg-red-50 px-4 py-2 rounded-xl">{{ error }}</p>

          <button type="submit" :disabled="loading"
            class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-100">
            {{ loading ? 'Creating...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-sm text-slate-400">
          Already have an account?
          <NuxtLink to="/login" class="text-emerald-600 font-bold hover:underline">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
