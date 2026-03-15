<template>
  <div class="min-h-screen bg-[#FCFCFC] pt-8 pb-32">
    <div class="max-w-5xl mx-auto px-4 md:px-6 space-y-8 md:space-y-10">

      <!-- Header -->
      <div class="text-center space-y-3 pt-8">
        <p class="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Your Wellness</p>
        <h1 class="text-5xl font-black text-slate-900 tracking-tighter">Health Score.</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Score Ring -->
        <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-6">
          <div class="relative flex items-center justify-center">
            <svg class="w-44 h-44 -rotate-90">
              <circle cx="88" cy="88" r="76" stroke="#f1f5f9" stroke-width="10" fill="transparent" />
              <circle
                cx="88" cy="88" r="76"
                stroke="currentColor"
                stroke-width="10"
                fill="transparent"
                stroke-linecap="round"
                :stroke-dasharray="478"
                :stroke-dashoffset="478 - (478 * healthScore) / 100"
                class="transition-all duration-1000 ease-out"
                :class="scoreColor"
              />
            </svg>
            <div class="absolute flex flex-col items-center">
              <span class="text-5xl font-black text-slate-900">{{ healthScore }}</span>
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Score</span>
            </div>
          </div>
          <div class="text-center">
            <h2 class="text-xl font-black tracking-tighter" :class="scoreTextColor">{{ scoreStatus }}</h2>
            <p class="text-xs text-slate-400 mt-1">Based on today's data</p>
          </div>
        </div>

        <!-- Metrics -->
        <div class="md:col-span-2 space-y-6">
          <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 class="font-black text-slate-900 tracking-tighter mb-6">Health Factors</h3>
            <div class="space-y-5">
              <div v-for="metric in metrics" :key="metric.name">
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-semibold text-slate-600">{{ metric.label }}</span>
                  <span class="text-sm font-black text-emerald-600">{{ metric.value }}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5">
                  <div class="bg-emerald-500 h-1.5 rounded-full transition-all duration-700" :style="{ width: metric.value + '%' }" />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p class="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Positive</p>
              <p class="text-sm text-slate-700 mt-1 font-medium">Fiber intake is 20% higher than yesterday.</p>
            </div>
            <div class="bg-red-50 p-4 rounded-2xl border border-red-100">
              <p class="text-[9px] font-black text-red-500 uppercase tracking-widest">To Improve</p>
              <p class="text-sm text-slate-700 mt-1 font-medium">You need 2 more glasses of water.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-black text-slate-900 tracking-tighter text-xl">Your Profile</h3>
            <p class="text-xs text-slate-400 mt-1">Personalize your nutrition goals</p>
          </div>
          <button
            v-if="!isEditing"
            class="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-50"
            @click="isEditing = true"
          >
            <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" /> Edit
          </button>
        </div>

        <div v-if="!isEditing" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="space-y-1">
            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Name</p>
            <p class="font-black text-slate-900 text-lg">{{ profile?.name || '—' }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Daily Calorie Goal</p>
            <p class="font-black text-slate-900 text-lg">{{ profile?.dailyCalorieGoal ?? '—' }} kcal</p>
          </div>
          <div class="space-y-1">
            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Diet Preference</p>
            <p class="font-black text-slate-900 text-lg">{{ profile?.dietPreference || '—' }}</p>
          </div>
        </div>

        <form v-else class="space-y-4" @submit.prevent="saveProfile">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Name</label>
              <input v-model="form.name" type="text" placeholder="Your name"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Daily Calorie Goal</label>
              <input v-model.number="form.dailyCalorieGoal" type="number" placeholder="2000"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Diet Preference</label>
              <select v-model="form.dietPreference"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white cursor-pointer">
                <option v-for="opt in dietOptions" :key="opt">{{ opt }}</option>
              </select>
            </div>
          </div>
          <div class="flex gap-3 justify-end">
            <button type="button" class="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors px-4 py-2" @click="isEditing = false">Cancel</button>
            <button type="submit" :disabled="saving" class="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all">
              {{ saving ? 'Saving...' : 'Save Profile' }}
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const toast = useToast()
const saving = ref(false)
const isEditing = ref(false)

const { data: profile, refresh } = await useFetch<{
  id: number; name: string | null; dailyCalorieGoal: number | null; dietPreference: string | null
} | null>('/api/profile', { lazy: true })

const { data: recommended } = await useFetch<any[]>('/api/recipes/recommended', { lazy: true })

const form = ref({
  name: profile.value?.name ?? '',
  dailyCalorieGoal: profile.value?.dailyCalorieGoal ?? 2000,
  dietPreference: profile.value?.dietPreference ?? 'Balanced',
})

const dietOptions = ['Balanced', 'Weight Loss', 'Muscle Gain', 'Diabetic', 'Vegan', 'Keto']

async function saveProfile() {
  saving.value = true
  try {
    await $fetch('/api/profile', {
      method: 'POST',
      body: { ...form.value, id: profile.value?.id },
    })
    toast.add({ title: 'Profile saved', color: 'emerald' })
    await refresh()
    isEditing.value = false
  } catch {
    toast.add({ title: 'Failed to save', color: 'red' })
  }
  saving.value = false
}

// Health metrics — nutrition quality based on whether user has set a calorie goal
const metrics = computed(() => [
  { name: 'nutrition', label: 'Nutrition Quality', value: profile.value?.dailyCalorieGoal ? 85 : 40 },
  { name: 'water', label: 'Hydration', value: 60 },
  { name: 'exercise', label: 'Physical Activity', value: 45 },
  { name: 'sleep', label: 'Sleep Quality', value: 70 },
])

const healthScore = computed(() => Math.round(metrics.value.reduce((a, m) => a + m.value, 0) / metrics.value.length))

const scoreColor = computed(() => {
  if (healthScore.value >= 80) return 'stroke-emerald-500'
  if (healthScore.value >= 50) return 'stroke-yellow-500'
  return 'stroke-red-500'
})

const scoreTextColor = computed(() => {
  if (healthScore.value >= 80) return 'text-emerald-500'
  if (healthScore.value >= 50) return 'text-yellow-500'
  return 'text-red-500'
})

const scoreStatus = computed(() => {
  if (healthScore.value >= 80) return 'Excellent'
  if (healthScore.value >= 50) return 'Good'
  return 'Needs Attention'
})
</script>


