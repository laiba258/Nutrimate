<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })
const toast = useToast()

interface Category { id: number; name: string }
const categories = ref<Category[]>([])
const newCat = ref('')

async function fetchCategories() {
  categories.value = await $fetch<Category[]>('/api/categories')
}

async function add() {
  const val = newCat.value.trim()
  if (!val) return
  try {
    await $fetch('/api/categories', { method: 'POST', body: { name: val } })
    newCat.value = ''
    toast.add({ title: 'Category added' })
    await fetchCategories()
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

async function remove(cat: Category) {
  if (!confirm(`Delete "${cat.name}"?`)) return
  try {
    await $fetch(`/api/categories/${cat.id}`, { method: 'DELETE' })
    toast.add({ title: 'Category deleted' })
    await fetchCategories()
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

onMounted(fetchCategories)
</script>

<template>
  <div class="space-y-6 max-w-xl">
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <h3 class="font-black text-slate-900 tracking-tighter">Recipe Categories</h3>
      <div class="flex gap-3">
        <input
          v-model="newCat"
          placeholder="New category name..."
          class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
          @keyup.enter="add"
        >
        <button
          class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all"
          @click="add"
        >
          <UIcon name="i-heroicons-plus" class="w-4 h-4" /> Add
        </button>
      </div>
      <div class="space-y-2">
        <div
          v-for="cat in categories" :key="cat.id"
          class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full bg-emerald-400" />
            <span class="font-semibold text-slate-700 text-sm">{{ cat.name }}</span>
          </div>
          <button
            class="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
            @click="remove(cat)"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4" />
          </button>
        </div>
        <div v-if="!categories.length" class="text-slate-400 text-sm py-4 text-center">No categories yet.</div>
      </div>
    </div>
  </div>
</template>
