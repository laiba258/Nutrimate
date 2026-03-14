<template>
  <div class="relative group text-center px-6 py-10 transition-all duration-700">
    <div class="absolute -top-4 left-1/2 -translate-x-1/2 text-[100px] font-black text-slate-900 opacity-[0.02] select-none group-hover:opacity-[0.05] transition-opacity duration-700 font-serif italic">
      {{ number }}
    </div>
    
    <div class="relative z-10 flex flex-col items-center">
      <div class="relative mb-10">
        <div class="absolute inset-0 bg-emerald-400 blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700 group-hover:scale-150"/>
        
        <div class="w-16 h-16 rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center shadow-sm group-hover:shadow-2xl group-hover:border-emerald-100 group-hover:-translate-y-3 transition-all duration-700 rotate-3 group-hover:rotate-0">
          <div class="p-3 bg-slate-50 rounded-2xl group-hover:bg-[#10b981] transition-colors duration-500">
            <UIcon 
              :name="icon" 
              class="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500" 
            />
          </div>
        </div>

        <div class="absolute -right-2 -top-2 w-4 h-4 bg-orange-100 rounded-full group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity"/>
      </div>

      <div class="space-y-4">
        <h4 class="text-lg font-black text-slate-900 tracking-tighter uppercase group-hover:text-[#10b981] transition-colors duration-500">
          {{ title }}
        </h4>
        
        <div class="w-8 h-[1px] bg-emerald-100 mx-auto group-hover:w-16 transition-all duration-500"/>

        <p class="text-[13px] text-slate-400 font-medium leading-relaxed max-w-[220px] mx-auto group-hover:text-slate-600 transition-colors">
          {{ description }}
        </p>
      </div>

      <div class="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <span class="text-[9px] font-black uppercase tracking-widest text-emerald-600">Learn More</span>
        <UIcon name="i-heroicons-arrow-small-right-20-solid" class="w-3 h-3 text-emerald-600" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  number: string
  title: string
  description: string
  icon: string
}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&display=swap');

.font-serif {
  font-family: 'Cormorant+Garamond', serif;
}
</style>