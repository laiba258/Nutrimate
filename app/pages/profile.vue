<template>
  <div class="min-h-screen bg-gray-50 p-6 md:p-12">
    <header class="max-w-4xl mx-auto mb-10 text-center">
      <h1 class="text-3xl font-bold text-emerald-600 mb-2">Personal Health Score</h1>
      <p class="text-gray-600">Track your wellness based on your daily intake and activities.</p>
    </header>

    <main class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div class="md:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
        <div class="relative flex items-center justify-center">
          <svg class="w-40 h-40">
            <circle cx="80" cy="80" r="70" stroke="#f3f4f6" stroke-width="12" fill="transparent" />
            <circle 
              cx="80" cy="80" r="70" 
              stroke="currentColor" 
              stroke-width="12" 
              fill="transparent" 
              :stroke-dasharray="440"
              :stroke-dashoffset="440 - (440 * healthScore) / 100"
              class="transition-all duration-1000 ease-out"
              :class="scoreColor"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-4xl font-bold text-gray-800">{{ healthScore }}</span>
            <span class="text-xs text-gray-500 uppercase tracking-widest">Score</span>
          </div>
        </div>
        <div class="mt-6 text-center">
          <h2 class="text-xl font-bold capitalize" :class="scoreTextColor">
            {{ scoreStatus }}
          </h2>
          <p class="text-sm text-gray-500 mt-1">Based on today's data</p>
        </div>
      </div>

      <div class="md:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 class="font-bold text-gray-800 mb-4 text-lg">Health Factors</h3>
          
          <div class="space-y-6">
            <div v-for="metric in metrics" :key="metric.name">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">{{ metric.label }}</span>
                <span class="text-sm font-bold text-blue-600">{{ metric.value }}%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div 
                  class="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                  :style="{ width: metric.value + '%' }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-green-50 p-4 rounded-xl border border-green-100">
            <p class="text-xs text-green-700 font-bold uppercase">Positive</p>
            <p class="text-sm text-green-800 mt-1">Fiber intake is 20% higher than yesterday.</p>
          </div>
          <div class="bg-red-50 p-4 rounded-xl border border-red-100">
            <p class="text-xs text-red-700 font-bold uppercase">To Improve</p>
            <p class="text-sm text-red-800 mt-1">You need 2 more glasses of water.</p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Dummy Data for Metrics
const metrics = ref([
  { name: 'nutrition', label: 'Nutrition Quality', value: 85 },
  { name: 'water', label: 'Hydration', value: 60 },
  { name: 'exercise', label: 'Physical Activity', value: 45 },
  { name: 'sleep', label: 'Sleep Quality', value: 90 }
])

// Calculate Overall Health Score
const healthScore = computed(() => {
  const total = metrics.value.reduce((acc, m) => acc + m.value, 0)
  return Math.round(total / metrics.value.length)
})

// Determine Color based on Score
const scoreColor = computed(() => {
  if (healthScore.value >= 80) return 'text-green-500 stroke-green-500'
  if (healthScore.value >= 50) return 'text-yellow-500 stroke-yellow-500'
  return 'text-red-500 stroke-red-500'
})

const scoreTextColor = computed(() => {
  if (healthScore.value >= 80) return 'text-green-500'
  if (healthScore.value >= 50) return 'text-yellow-500'
  return 'text-red-500'
})

// Determine Status Text
const scoreStatus = computed(() => {
  if (healthScore.value >= 80) return 'Excellent'
  if (healthScore.value >= 50) return 'Good'
  return 'Needs Attention'
})
</script>

<style scoped>
circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>