<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <!-- Hero -->
    <section class="bg-gradient-to-br from-slate-900 to-slate-800 pt-28 pb-16 px-4 text-center">
      <div class="max-w-2xl mx-auto">
        <span class="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">Get In Touch</span>
        <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">We'd love to hear from you</h1>
        <p class="text-slate-400 text-lg">Questions, feedback, or just want to say hi — we're here.</p>
      </div>
    </section>

    <section class="py-20 px-4">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        <!-- Contact info -->
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-black text-slate-900 tracking-tighter mb-2">Contact Information</h2>
            <p class="text-slate-500 text-sm leading-relaxed">Reach out through any of the channels below. We typically respond within 24 hours.</p>
          </div>
          <div class="space-y-5">
            <div v-for="item in contactItems" :key="item.label" class="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div class="text-2xl shrink-0">{{ item.icon }}</div>
              <div>
                <p class="font-black text-slate-800 text-sm">{{ item.label }}</p>
                <p class="text-slate-500 text-sm mt-0.5">{{ item.value }}</p>
              </div>
            </div>
          </div>
          <div class="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <p class="font-black text-emerald-800 text-sm mb-1">🎓 Student Project</p>
            <p class="text-emerald-700 text-xs leading-relaxed">NutriMate is an academic project focused on SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption). We welcome feedback from educators, researchers, and users alike.</p>
          </div>
        </div>

        <!-- Contact form -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h3 class="font-black text-slate-900 text-xl tracking-tighter mb-6">Send a Message</h3>
          <div v-if="sent" class="py-12 text-center">
            <div class="text-5xl mb-4">✅</div>
            <p class="font-black text-slate-900 text-lg">Message sent!</p>
            <p class="text-slate-500 text-sm mt-2">Thanks for reaching out. We'll get back to you soon.</p>
            <button class="mt-6 text-emerald-500 font-bold text-sm" @click="sent = false">Send another</button>
          </div>
          <form v-else class="space-y-5" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">First Name</label>
                <input v-model="form.firstName" type="text" placeholder="Laiba" required class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Name</label>
                <input v-model="form.lastName" type="text" placeholder="Khan" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white">
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Email *</label>
              <input v-model="form.email" type="email" placeholder="you@example.com" required class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</label>
              <select v-model="form.subject" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white cursor-pointer">
                <option value="">Select a topic...</option>
                <option>General Inquiry</option>
                <option>Recipe Suggestion</option>
                <option>Bug Report</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Message *</label>
              <textarea v-model="form.message" rows="5" placeholder="Tell us what's on your mind..." required class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white resize-none" />
            </div>
            <button type="submit" :disabled="submitting" class="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all">
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Contact — NutriMate', description: 'Get in touch with the NutriMate team.' })

const sent = ref(false)
const submitting = ref(false)

const form = ref({ firstName: '', lastName: '', email: '', subject: '', message: '' })

const contactItems = [
  { icon: '📧', label: 'Email', value: 'contact@nutrimate.com' },
  { icon: '📍', label: 'Location', value: 'Pakistan' },
  { icon: '🕐', label: 'Response Time', value: 'Within 24 hours' },
]

async function handleSubmit() {
  submitting.value = true
  // Simulate send (no backend endpoint needed for a student project)
  await new Promise(r => setTimeout(r, 1000))
  submitting.value = false
  sent.value = true
  form.value = { firstName: '', lastName: '', email: '', subject: '', message: '' }
}
</script>
