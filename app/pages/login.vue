<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: false })

const { login, isLoggedIn, isAdmin } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

if (isLoggedIn.value) navigateTo(isAdmin.value ? '/admin' : '/')

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const result = await login(email.value, password.value)
    await navigateTo(result.role === 'admin' ? '/admin' : '/')
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Login failed'
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#FCFCFC] flex">
    <!-- Left panel -->
    <div class="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-16 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px]" />
      </div>
      <NuxtLink to="/" class="flex items-center gap-3 relative z-10">
        <div class="bg-emerald-500 p-2 rounded-xl">
          <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-white" />
        </div>
        <span class="text-2xl font-black tracking-tighter text-white">NUTRI<span class="text-emerald-400">MATE</span></span>
      </NuxtLink>
      <div class="relative z-10 space-y-6">
        <h2 class="text-5xl font-black text-white tracking-tighter leading-tight">
          Eat with<br><span class="text-emerald-400 italic font-serif font-light">Purpose.</span>
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
          Track macros, reduce waste, and eat smarter — all in one place.
        </p>
      </div>
      <p class="text-slate-600 text-xs relative z-10">© 2026 NutriMate. All rights reserved.</p>
    </div>

    <!-- Right panel -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-sm space-y-8">
        <div class="space-y-2">
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter">Welcome back.</h1>
          <p class="text-sm text-slate-400">Sign in to your account to continue.</p>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <div class="space-y-3">
            <div>
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Email</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="you@example.com"
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              >
            </div>
            <div>
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1.5">Password</label>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              >
            </div>
          </div>

          <p v-if="error" class="text-xs text-red-500 font-medium bg-red-50 px-4 py-2 rounded-xl">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-slate-900 hover:bg-emerald-600 disabled:opacity-50 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-sm text-slate-400">
          No account?
          <NuxtLink to="/register" class="text-emerald-600 font-bold hover:underline">Create one</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
