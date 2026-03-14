<script setup lang="ts">
// Pure Nuxt / Vue logic - Modern & Fast
</script>

<template>
  <section class="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-12">
    
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[10%] right-[10%] w-80 h-80 bg-emerald-50/40 rounded-full blur-[120px] animate-pulse"/>
      <div class="absolute bottom-[10%] left-[5%] w-60 h-60 bg-orange-50/30 rounded-full blur-[100px]"/>
    </div>

    <div class="max-w-7xl mx-auto px-8 w-full relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        
        <div class="space-y-8 lg:pr-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 shadow-xl shadow-slate-200">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"/>
            <span class="text-[9px] font-black uppercase tracking-[0.3em] text-white">Feel Good Food</span>
          </div>

          <h1 class="text-6xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
            Eat with <br> 
            <span class="text-[#10b981] italic font-serif font-light">Purpose.</span>
          </h1>

          <p class="text-sm text-slate-400 font-medium max-w-sm leading-relaxed border-l-2 border-emerald-100 pl-4">
            NutriMate brings <span class="text-slate-900 font-bold">minimalist logic</span> to your kitchen. Macro-tracking that looks as good as it tastes.
          </p>

          <div class="flex items-center gap-6 pt-4">
            <button class="bg-[#10b981] hover:bg-[#059669] text-white px-9 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] hover:-translate-y-1 active:scale-95">
              Get Started
            </button>
            
            <button class="group flex items-center gap-3">
              <div class="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-all shadow-sm">
                <UIcon name="i-heroicons-play-20-solid" class="w-4 h-4 text-slate-900" />
              </div>
              <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">The Vibe</span>
            </button>
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end pr-10">
          
          <div class="relative group">
            <div class="relative w-[300px] aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl z-20 border-[6px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800" 
                class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                alt="Aesthetic Healthy Food"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
            </div>

            <div class="absolute -top-6 -right-10 z-30 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl border border-white animate-float-slow">
              <div class="flex flex-col items-center min-w-[50px]">
                <span class="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Low</span>
                <span class="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Calorie</span>
              </div>
            </div>

            <div class="absolute top-1/2 -left-12 -translate-y-1/2 z-30 bg-[#10b981] p-6 rounded-full shadow-2xl shadow-emerald-200/50 border-4 border-white animate-float-fast cursor-pointer hover:scale-110 transition-transform">
              <div class="flex flex-col items-center text-white">
                <UIcon name="i-heroicons-bolt-20-solid" class="w-4 h-4 mb-0.5" />
                <span class="text-[9px] font-black uppercase tracking-widest leading-none">High</span>
                <span class="text-[9px] font-black uppercase tracking-widest leading-none">Protein</span>
              </div>
            </div>

            <div class="absolute -bottom-4 -right-4 z-30 bg-slate-900 p-5 rounded-full shadow-2xl border-4 border-white animate-float-medium">
              <div class="flex flex-col items-center text-white">
                <span class="text-[8px] font-black text-emerald-400 uppercase leading-none">Zero</span>
                <span class="text-[9px] font-black uppercase tracking-tighter leading-none text-white/90">Waste</span>
              </div>
            </div>

            <div class="absolute inset-0 bg-emerald-100/40 rounded-[3rem] blur-3xl -z-10 translate-x-6 translate-y-6"/>
          </div>

          <div class="absolute -right-16 top-1/2 -translate-y-1/2 hidden xl:block rotate-90 select-none">
            <p class="text-[90px] font-black text-slate-900/[0.02] tracking-widest uppercase">
              Taste
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap');

.font-serif {
  font-family: 'Cormorant+Garamond', serif;
}

/* --- ANIMATIONS (Fluid & Anime) --- */

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(8px); }
}

@keyframes float-alt {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(18px) translateX(-6px); }
}

.animate-float-slow {
  animation: float 7s infinite ease-in-out;
}

.animate-float-fast {
  animation: float-alt 5s infinite ease-in-out;
}

.animate-float-medium {
  animation: float 6s infinite ease-in-out;
}

/* Entrance */
section {
  animation: reveal 1.5s cubic-bezier(0.19, 1, 0.22, 1);
}

@keyframes reveal {
  from { opacity: 0; filter: blur(10px); }
  to { opacity: 1; filter: blur(0); }
}
</style>