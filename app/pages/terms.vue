<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <section class="bg-gradient-to-br from-slate-900 to-slate-800 pt-28 pb-16 px-4 text-center">
      <div class="max-w-2xl mx-auto">
        <span class="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">Legal</span>
        <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Terms of Service</h1>
        <p class="text-slate-400">Last updated: March 2026</p>
      </div>
    </section>

    <section class="py-16 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Quick nav -->
        <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-12">
          <p class="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Contents</p>
          <div class="grid sm:grid-cols-2 gap-2">
            <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" class="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">→ {{ s.title }}</a>
          </div>
        </div>

        <div class="prose-custom space-y-12">
          <div v-for="s in sections" :key="s.id" :id="s.id" class="scroll-mt-24">
            <h2 class="text-xl font-black text-slate-900 tracking-tighter mb-4 pb-3 border-b border-slate-100">{{ s.title }}</h2>
            <div class="space-y-3">
              <p v-for="(p, i) in s.content" :key="i" class="text-slate-500 text-sm leading-relaxed">{{ p }}</p>
            </div>
          </div>
        </div>

        <div class="mt-16 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
          <p class="text-sm text-emerald-700 font-semibold">Questions about these terms?</p>
          <NuxtLink to="/contact" class="inline-block mt-3 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all">Contact Us</NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Terms of Service — NutriMate', description: 'NutriMate terms of service and usage policy.' })

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using NutriMate ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.',
      'NutriMate is an academic project developed to promote healthy, affordable, and sustainable eating habits in alignment with UN Sustainable Development Goals 2 and 12.',
    ],
  },
  {
    id: 'use',
    title: '2. Use of the Platform',
    content: [
      'NutriMate is provided for personal, non-commercial use. You may browse recipes, create an account, and use the nutritional tools provided.',
      'You agree not to misuse the Platform, attempt to gain unauthorized access, or use it for any unlawful purpose.',
      'You are responsible for maintaining the confidentiality of your account credentials.',
    ],
  },
  {
    id: 'content',
    title: '3. Content & Accuracy',
    content: [
      'Nutritional information provided on NutriMate is for general informational purposes only and should not be considered medical or dietary advice.',
      'Always consult a qualified healthcare professional or registered dietitian before making significant changes to your diet.',
      'We strive to keep recipe and nutritional data accurate, but we cannot guarantee the completeness or accuracy of all information.',
    ],
  },
  {
    id: 'accounts',
    title: '4. User Accounts',
    content: [
      'You must provide accurate information when creating an account. You are responsible for all activity that occurs under your account.',
      'We reserve the right to suspend or terminate accounts that violate these terms or engage in abusive behavior.',
      'You may delete your account at any time by contacting us.',
    ],
  },
  {
    id: 'privacy',
    title: '5. Privacy',
    content: [
      'We collect minimal personal data (name, email) solely to provide account functionality. We do not sell or share your data with third parties.',
      'Passwords are securely hashed and never stored in plain text.',
      'By using NutriMate, you consent to the collection and use of information as described above.',
    ],
  },
  {
    id: 'ip',
    title: '6. Intellectual Property',
    content: [
      'All content on NutriMate, including recipes, text, and design, is the property of NutriMate or its content creators.',
      'You may not reproduce, distribute, or create derivative works without explicit written permission.',
    ],
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: [
      'NutriMate is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Platform.',
      'As an academic project, NutriMate is not a commercial service and is provided in good faith for educational and community benefit.',
    ],
  },
  {
    id: 'changes',
    title: '8. Changes to Terms',
    content: [
      'We may update these Terms of Service from time to time. Continued use of the Platform after changes constitutes acceptance of the new terms.',
      'We will notify registered users of significant changes via email where possible.',
    ],
  },
]
</script>
