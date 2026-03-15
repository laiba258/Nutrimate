<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })
const toast = useToast()

const getIngredients = (): string[] => JSON.parse(localStorage.getItem('nutrimate_ingredients') || '["Avocado","Berry","Spinach","Tofu","Salmon","Pasta","Chicken","Rice","Egg","Lemon"]')
const saveIngredients = (i: string[]) => localStorage.setItem('nutrimate_ingredients', JSON.stringify(i))

const ingredients = ref(getIngredients())
const newIng = ref('')
const search = ref('')

const filtered = computed(() =>
  ingredients.value.filter(i => i.toLowerCase().includes(search.value.toLowerCase()))
)

function add() {
  const val = newIng.value.trim()
  if (!val) return
  if (ingredients.value.map(i => i.toLowerCase()).includes(val.toLowerCase())) {
    toast.add({ title: 'Already exists', color: 'red' }); return
  }
  ingredients.value.push(val)
  saveIngredients(ingredients.value)
  newIng.value = ''
  toast.add({ title: 'Ingredient added', color: 'emerald' })
}

function remove(ing: string) {
  ingredients.value = ingredients.value.filter(i => i !== ing)
  saveIngredients(ingredients.value)
  toast.add({ title: 'Removed', color: 'emerald' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
      <div class="flex gap-3">
        <UInput v-model="newIng" placeholder="Add new ingredient..." class="flex-1" @keyup.enter="add" />
        <UButton class="bg-emerald-500 hover:bg-emerald-600 text-white" icon="i-heroicons-plus" label="Add" @click="add" />
      </div>
      <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search ingredients..." />
      <div class="flex flex-wrap gap-2 pt-2">
        <div
          v-for="ing in filtered" :key="ing"
          class="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold"
        >
          {{ ing }}
          <button class="hover:text-red-500 transition-colors font-black text-base leading-none" @click="remove(ing)">×</button>
        </div>
        <div v-if="!filtered.length" class="text-slate-400 text-sm py-4 w-full text-center">No ingredients found.</div>
      </div>
    </div>
  </div>
</template>
