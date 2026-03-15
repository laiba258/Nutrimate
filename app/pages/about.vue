<template>
  <div>
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 pt-16 pb-20 px-4 text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle at 30% 50%, #10b981 0%, transparent 60%), radial-gradient(circle at 70% 20%, #14b8a6 0%, transparent 50%)" />
      <div class="relative z-10 max-w-3xl mx-auto">
        <span class="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">Our Story</span>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
          Eating well shouldn't be<br><span class="text-emerald-400">complicated or costly</span>
        </h1>
        <p class="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          NutriMate was built for students and families who want to eat healthier, waste less, and spend smarter — without a nutrition degree.
        </p>
      </div>
    </section>

    <!-- Mission -->
    <section class="py-20 px-4">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span class="text-emerald-500 font-black uppercase tracking-widest text-xs">Our Mission</span>
          <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mt-3 mb-6 leading-tight">
            Nutrition for everyone, not just the privileged
          </h2>
          <p class="text-slate-500 leading-relaxed mb-4">
            Too many people skip healthy eating because it feels expensive, confusing, or time-consuming. We built NutriMate to change that — giving you smart, affordable recipes with real nutritional data.
          </p>
          <p class="text-slate-500 leading-relaxed">
            Every recipe on our platform is designed with budget, time, and sustainability in mind. We believe good food and a healthy planet go hand in hand.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <p class="text-3xl font-black text-emerald-500 mb-1">{{ stat.value }}</p>
            <p class="text-sm font-bold text-slate-700">{{ stat.label }}</p>
            <p class="text-xs text-slate-400 mt-1">{{ stat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 px-4 bg-slate-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <span class="text-emerald-500 font-black uppercase tracking-widest text-xs">What We Stand For</span>
          <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mt-3">Our core values</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="v in values" :key="v.title" class="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
            <div class="text-3xl mb-4">{{ v.icon }}</div>
            <h3 class="font-black text-slate-900 text-lg mb-2">{{ v.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SDGs -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <span class="text-emerald-500 font-black uppercase tracking-widest text-xs">UN Sustainable Development Goals</span>
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mt-3 mb-6">Built around global impact</h2>
        <p class="text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          NutriMate directly supports two UN SDGs — helping tackle food insecurity and promoting responsible consumption patterns.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <div class="flex-1 max-w-xs mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <p class="text-4xl mb-3">🌾</p>
            <p class="font-black text-emerald-700 text-lg">SDG 2</p>
            <p class="font-bold text-emerald-600 text-sm">Zero Hunger</p>
            <p class="text-emerald-600/70 text-xs mt-2 leading-relaxed">Affordable, nutritious recipes accessible to everyone regardless of income.</p>
          </div>
          <div class="flex-1 max-w-xs mx-auto bg-teal-50 border border-teal-200 rounded-2xl p-6">
            <p class="text-4xl mb-3">♻️</p>
            <p class="font-black text-teal-700 text-lg">SDG 12</p>
            <p class="font-bold text-teal-600 text-sm">Responsible Consumption</p>
            <p class="text-teal-600/70 text-xs mt-2 leading-relaxed">Zero-waste cooking tips that reduce food waste and environmental impact.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-4 bg-slate-900 text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">Ready to eat smarter?</h2>
        <p class="text-slate-400 mb-8">Join thousands of users already cooking healthier, wasting less, and spending smarter.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/register" class="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all">Get Started Free</NuxtLink>
          <NuxtLink to="/recipe" class="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all">Browse Recipes</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'About — NutriMate', description: 'Learn about NutriMate\'s mission to make healthy, affordable, sustainable eating accessible to everyone.' })
definePageMeta({ layout: 'public' })

const stats = [
  { value: '30+', label: 'Recipes', desc: 'Curated healthy meals' },
  { value: '100%', label: 'Free', desc: 'No paywalls ever' },
  { value: '2', label: 'UN SDGs', desc: 'Aligned with global goals' },
  { value: '0', label: 'Food Waste', desc: 'Our zero-waste goal' },
]

const values = [
  { icon: '🥗', title: 'Nutrition First', desc: 'Every recipe comes with real macro data so you always know what you\'re eating.' },
  { icon: '💸', title: 'Budget Friendly', desc: 'Healthy eating shouldn\'t break the bank. We prioritize affordable ingredients.' },
  { icon: '♻️', title: 'Zero Waste', desc: 'We show you how to use every part of your ingredients and reduce food waste.' },
  { icon: '⚡', title: 'Quick & Easy', desc: 'Most recipes are under 30 minutes — designed for busy students and families.' },
  { icon: '🌱', title: 'Sustainable', desc: 'We promote plant-forward eating and environmentally conscious food choices.' },
  { icon: '🤝', title: 'Community', desc: 'Built for everyone — students, families, beginners, and seasoned home cooks.' },
]
</script>
