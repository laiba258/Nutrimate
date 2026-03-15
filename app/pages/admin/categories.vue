<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })
const toast = useToast()

const getCategories = (): string[] => JSON.parse(localStorage.getItem('nutrimate_categories') || '["Zero Waste","High Protein","Budget Friendly","Quick Fix","Vegan"]')
const saveCategories = (c: string[]) => localStorage.setItem('nutrimate_categories', JSON.stringify(c))

const categories = ref(getCategories())
const newCat = ref('')

function add() {
  const val = newCat.value.trim()
  if (!val) return
  if (categories.value.includes(val)) { toast.add({ title: 'Already exists', color: 'red' }); return }
  categories.value.push(val)
  saveCategories(categories.value)
  newCat.value = ''
  toast.add({ title: 'Category added', color: 'emerald' })
}

function remove(cat: string) {
  if (!confirm(`Delete "${cat}"?`)) return
  categories.value = categories.value.filter(c => c !== cat)
  saveCategories(categories.value)
  toast.add({ title: 'Category deleted', color: 'emerald' })
}
</script>

<template>
  <div class="space-y-6 max-w-xl">
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <h3 class="font-black text-slate-900 tracking-tighter">Recipe Categories</h3>
      <div class="flex gap-3">
        <UInput v-model="newCat" placeholder="New category name..." class="flex-1" @keyup.enter="add" />
        <UButton class="bg-emerald-500 hover:bg-emerald-600 text-white" icon="i-heroicons-plus" label="Add" @click="add" />
      </div>
      <div class="space-y-2">
        <div
          v-for="cat in categories" :key="cat"
          class="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full bg-emerald-400" />
            <span class="font-semibold text-slate-700 text-sm">{{ cat }}</span>
          </div>
          <UButton class="text-red-500 hover:bg-red-50" variant="ghost" icon="i-heroicons-trash" size="xs" @click="remove(cat)" />
        </div>
      </div>
    </div>
  </div>
</template>
