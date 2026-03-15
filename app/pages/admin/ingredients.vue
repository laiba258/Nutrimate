<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })
const toast = useToast()

interface Ingredient { id: number; name: string }
const ingredients = ref<Ingredient[]>([])
const newIng = ref('')
const search = ref('')

const filtered = computed(() =>
  ingredients.value.filter(i => i.name.toLowerCase().includes(search.value.toLowerCase()))
)

async function fetchIngredients() {
  ingredients.value = await $fetch<Ingredient[]>('/api/ingredients')
}

async function add() {
  const val = newIng.value.trim()
  if (!val) return
  try {
    await $fetch('/api/ingredients', { method: 'POST', body: { name: val } })
    newIng.value = ''
    toast.add({ title: 'Ingredient added' })
    await fetchIngredients()
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

async function remove(ing: Ingredient) {
  try {
    await $fetch(`/api/ingredients/${ing.id}`, { method: 'DELETE' })
    toast.add({ title: 'Removed' })
    await fetchIngredients()
  } catch (e: any) {
    toast.add({ title: e?.data?.message ?? 'Failed', color: 'red' })
  }
}

onMounted(fetchIngredients)
</script>

<template>
  <div class="space-y-6 max-w-2xl">
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div class="flex gap-3">
        <input
          v-model="newIng"
          placeholder="Add new ingredient..."
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
      <input
        v-model="search"
        placeholder="Search ingredients..."
        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white"
      >
      <div class="flex flex-wrap gap-2 pt-2">
        <div
          v-for="ing in filtered" :key="ing.id"
          class="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold"
        >
          {{ ing.name }}
          <button class="hover:text-red-500 transition-colors font-black text-base leading-none" @click="remove(ing)">×</button>
        </div>
        <div v-if="!filtered.length" class="text-slate-400 text-sm py-4 w-full text-center">No ingredients found.</div>
      </div>
    </div>
  </div>
</template>
