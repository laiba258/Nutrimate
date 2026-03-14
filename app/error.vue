<script setup lang="ts">
defineProps<{ error: { statusCode: number; message: string } }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-[#FCFCFC] flex items-center justify-center px-6">
    <div class="text-center space-y-8 max-w-md">
      <div class="relative">
        <p class="text-[160px] font-black text-slate-900/[0.04] leading-none select-none">{{ error.statusCode }}</p>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center">
            <UIcon name="i-heroicons-face-frown" class="w-10 h-10 text-emerald-400" />
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <h1 class="text-3xl font-black text-slate-900 tracking-tighter">
          {{ error.statusCode === 404 ? 'Page not found.' : 'Something went wrong.' }}
        </h1>
        <p class="text-slate-400 text-sm leading-relaxed">
          {{ error.statusCode === 404 ? "The page you're looking for doesn't exist or has been moved." : error.message }}
        </p>
      </div>
      <button
        class="bg-slate-900 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg"
        @click="handleError"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>
