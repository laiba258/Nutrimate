<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const toast = useToast()

interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string;
  imageUrl: string;
  cookingTime: number | null;
  costLevel: string;
  category: string;
  isZeroWaste: boolean;
  sustainabilityTip: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  ingredients: string;
  createdAt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

const getRecipes = (): Recipe[] => {
  if (import.meta.server) return []
  return JSON.parse(localStorage.getItem('nutrimate_recipes') || '[]')
}
const saveRecipes = (r: Recipe[]) => localStorage.setItem('nutrimate_recipes', JSON.stringify(r))

const recipes = ref<Recipe[]>([])
const search = ref('')
const isPanelOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)
const activeTab = ref('basic')
const filterCategories = ['All', 'Zero Waste', 'High Protein', 'Budget Friendly', 'Quick Fix', 'Vegan']
const activeCategory = ref('All')

const emptyForm = (): Omit<Recipe, 'id' | 'createdAt'> => ({
  title: '', description: '', instructions: '', imageUrl: '',
  cookingTime: null, costLevel: 'Low', category: 'Budget Friendly',
  isZeroWaste: false, sustainabilityTip: '', calories: null,
  protein: null, carbs: null, fat: null, ingredients: '',
  seoTitle: '', seoDescription: '', seoKeywords: '',
})
const form = ref(emptyForm())

const seoPreviewTitle = computed(() => form.value.seoTitle || form.value.title || 'Recipe Title')
const seoPreviewDesc = computed(() => form.value.seoDescription || form.value.description || 'Recipe description will appear here...')
const seoPreviewUrl = computed(() => `nutrimate.com/recipe/${(form.value.title || 'recipe-name').toLowerCase().replace(/\s+/g, '-')}`)

const filtered = computed(() => {
  let list = recipes.value
  if (activeCategory.value !== 'All') list = list.filter(r => r.category === activeCategory.value)
  if (search.value) list = list.filter(r => r.title.toLowerCase().includes(search.value.toLowerCase()))
  return list
})

function openAdd() {
  isEditMode.value = false
  editingId.value = null
  form.value = emptyForm()
  activeTab.value = 'basic'
  isPanelOpen.value = true
}
function openEdit(r: Recipe) {
  isEditMode.value = true
  editingId.value = r.id
  form.value = { ...emptyForm(), ...r }
  activeTab.value = 'basic'
  isPanelOpen.value = true
}
function closePanel() { isPanelOpen.value = false }

function save() {
  if (!form.value.title || !form.value.instructions) {
    toast.add({ title: 'Title and instructions are required', color: 'red' })
    activeTab.value = 'basic'
    return
  }
  saving.value = true
  const list = getRecipes()
  if (isEditMode.value && editingId.value) {
    const idx = list.findIndex(r => r.id === editingId.value)
    if (idx !== -1) {
      const existing = list[idx]
      list[idx] = { ...existing, ...form.value, id: editingId.value, createdAt: existing?.createdAt || new Date().toISOString() }
    }
    toast.add({ title: 'Recipe updated', color: 'emerald' })
  } else {
    const newRecipe: Recipe = { 
      ...form.value, 
      id: crypto.randomUUID(), 
      createdAt: new Date().toISOString() 
    }
    list.push(newRecipe)
    toast.add({ title: 'Recipe added', color: 'emerald' })
  }
  saveRecipes(list)
  recipes.value = list
  isPanelOpen.value = false
  saving.value = false
}

function deleteRecipe(id: string) {
  if (!confirm('Delete this recipe?')) return
  const list = getRecipes().filter(r => r.id !== id)
  saveRecipes(list)
  recipes.value = list
  toast.add({ title: 'Recipe deleted', color: 'emerald' })
}

onMounted(() => {
  recipes.value = getRecipes()
  if (route.query.add === 'true') { 
    openAdd()
    router.replace('/admin/recipes') 
  }
})
</script>

<template>
<div>
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          v-for="cat in filterCategories" :key="cat"
          :class="activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'"
          class="whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          @click="activeCategory = cat">{{ cat }}</button>
      </div>
      <div class="flex gap-3 w-full sm:w-auto shrink-0">
        <input
          v-model="search" placeholder="Search recipes..."
          class="flex-1 sm:w-52 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 bg-white">
        <button class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all" @click="openAdd">
          <UIcon name="i-heroicons-plus" class="w-4 h-4" /> Add Recipe
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="filtered.length" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50/80">
              <th class="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Recipe</th>
              <th class="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th class="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cost</th>
              <th class="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Kcal</th>
              <th class="text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
              <th class="px-4 py-4" />
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="r in filtered" :key="r.id" class="hover:bg-slate-50/60 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl overflow-hidden bg-emerald-50 shrink-0 border border-slate-100">
                    <img v-if="r.imageUrl" :src="r.imageUrl" :alt="r.title" class="w-full h-full object-cover">
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <UIcon name="i-heroicons-photo" class="w-5 h-5 text-slate-300" />
                    </div>
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-sm">{{ r.title }}</p>
                    <p class="text-xs text-slate-400 truncate max-w-[160px]">{{ r.description || '—' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4"><span class="text-xs font-semibold text-slate-500">{{ r.category }}</span></td>
              <td class="px-4 py-4">
                <span
                  class="text-xs font-bold px-2.5 py-1 rounded-lg"
                  :class="r.costLevel === 'Low' ? 'bg-emerald-50 text-emerald-600' : r.costLevel === 'High' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'">
                  {{ r.costLevel }}
                </span>
              </td>
              <td class="px-4 py-4"><span class="text-sm text-slate-600">{{ r.calories ?? '—' }}</span></td>
              <td class="px-4 py-4"><span class="text-sm text-slate-500">{{ r.cookingTime ? r.cookingTime + ' min' : '—' }}</span></td>
              <td class="px-4 py-4">
                <div class="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700" @click="openEdit(r)">
                    <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
                  </button>
                  <button class="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500" @click="deleteRecipe(r.id)">
                    <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="py-24 text-center">
        <div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-book-open" class="w-8 h-8 text-emerald-300" />
        </div>
        <p class="text-slate-400 font-semibold">No recipes found.</p>
        <button class="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider" @click="openAdd">Add First Recipe</button>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isPanelOpen" class="fixed inset-0 z-[200] flex justify-end">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="closePanel" />
        <Transition name="slide">
          <div v-if="isPanelOpen" class="relative w-full max-w-[560px] bg-white shadow-2xl flex flex-col h-full">
            <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div>
                <h2 class="font-black text-slate-900 tracking-tighter text-lg">{{ isEditMode ? 'Edit Recipe' : 'New Recipe' }}</h2>
                <p class="text-xs text-slate-400 mt-0.5">Fill in the details below</p>
              </div>
              <button class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500" @click="closePanel">
                <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
              </button>
            </div>
            <div class="flex border-b border-slate-100 px-6 shrink-0">
              <button
                v-for="tab in [
                  { id: 'basic', label: 'Basic Info', icon: 'i-heroicons-document-text' },
                  { id: 'nutrition', label: 'Nutrition', icon: 'i-heroicons-fire' },
                  { id: 'seo', label: 'SEO', icon: 'i-heroicons-magnifying-glass' },
                ]" :key="tab.id"
                :class="activeTab === tab.id ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-slate-400 hover:text-slate-600'"
                class="flex items-center gap-1.5 px-4 py-3.5 text-xs font-black uppercase tracking-wider -mb-px"
                @click="activeTab = tab.id">
                <UIcon :name="tab.icon" class="w-3.5 h-3.5" />{{ tab.label }}
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-6 space-y-5">
              <template v-if="activeTab === 'basic'">
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Recipe Title *</label>
                  <input
                    v-model="form.title" type="text" placeholder="e.g. Healthy Chicken Karahi"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Short Description</label>
                  <input
                    v-model="form.description" type="text" placeholder="A brief description..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Image URL</label>
                  <input
                    v-model="form.imageUrl" type="url" placeholder="https://images.unsplash.com/..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
                  <div v-if="form.imageUrl" class="mt-2 h-32 rounded-xl overflow-hidden border border-slate-100">
                    <img :src="form.imageUrl" alt="Preview" class="w-full h-full object-cover">
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Category</label>
                    <select v-model="form.category" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white cursor-pointer">
                      <option v-for="c in ['Zero Waste','High Protein','Budget Friendly','Quick Fix','Vegan']" :key="c">{{ c }}</option>
                    </select>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Cost Level</label>
                    <select v-model="form.costLevel" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white cursor-pointer">
                      <option>Low</option><option>Medium</option><option>High</option>
                    </select>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Cooking Time (minutes)</label>
                  <input
                    v-model.number="form.cookingTime" type="number" placeholder="20" min="1"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Ingredients (comma separated)</label>
                  <input
                    v-model="form.ingredients" type="text" placeholder="Chicken, Rice, Tomato..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Instructions * (one step per line)</label>
                  <textarea
                    v-model="form.instructions" rows="5" placeholder="Step 1: Marinate the chicken..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white resize-none" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Zero Waste Tip</label>
                  <textarea
                    v-model="form.sustainabilityTip" rows="2" placeholder="How to use leftovers..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white resize-none" />
                </div>
                <label class="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30">
                  <div class="relative shrink-0">
                    <input v-model="form.isZeroWaste" type="checkbox" class="sr-only">
                    <div :class="form.isZeroWaste ? 'bg-emerald-500' : 'bg-slate-200'" class="w-10 h-6 rounded-full transition-colors">
                      <div :class="form.isZeroWaste ? 'translate-x-5' : 'translate-x-1'" class="w-4 h-4 bg-white rounded-full shadow mt-1 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-700">Mark as Zero Waste Recipe</p>
                    <p class="text-xs text-slate-400">Will be tagged with the Zero Waste badge</p>
                  </div>
                </label>
              </template>
              <template v-if="activeTab === 'nutrition'">
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p class="text-xs font-bold text-emerald-700">Per serving values</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div
                    v-for="field in [
                      { key: 'calories', label: 'Calories', unit: 'kcal', placeholder: '450' },
                      { key: 'protein', label: 'Protein', unit: 'g', placeholder: '25' },
                      { key: 'carbs', label: 'Carbohydrates', unit: 'g', placeholder: '40' },
                      { key: 'fat', label: 'Total Fat', unit: 'g', placeholder: '15' },
                    ]" :key="field.key" class="space-y-1.5">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">{{ field.label }}</label>
                    <div class="relative">
                      <input
                        v-model.number="(form as any)[field.key]" type="number" :placeholder="field.placeholder" min="0"
                        class="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white">
                      <span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">{{ field.unit }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="form.calories" class="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                  <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Macro Breakdown</p>
                  <div class="flex gap-3">
                    <div
                      v-for="m in [
                        { label: 'Protein', val: form.protein, color: 'bg-blue-400' },
                        { label: 'Carbs', val: form.carbs, color: 'bg-orange-400' },
                        { label: 'Fat', val: form.fat, color: 'bg-yellow-400' },
                      ]" :key="m.label" class="flex-1 text-center">
                      <div class="h-2 rounded-full mb-2" :class="m.color" :style="{ opacity: m.val ? 1 : 0.2 }" />
                      <p class="text-xs font-bold text-slate-700">{{ m.val ?? 0 }}g</p>
                      <p class="text-[9px] text-slate-400 uppercase tracking-wider">{{ m.label }}</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="activeTab === 'seo'">
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">SEO Title</label>
                  <input
                    v-model="form.seoTitle" type="text" :placeholder="form.title || 'SEO optimized title...'"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white">
                  <p class="text-xs text-slate-400">{{ (form.seoTitle || form.title || '').length }}/60 characters</p>
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Meta Description</label>
                  <textarea
                    v-model="form.seoDescription" rows="3" :placeholder="form.description || 'Describe this recipe for search engines...'"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white resize-none" />
                  <p class="text-xs text-slate-400">{{ (form.seoDescription || form.description || '').length }}/160 characters</p>
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Keywords (comma separated)</label>
                  <input
                    v-model="form.seoKeywords" type="text" placeholder="healthy recipe, zero waste..."
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 bg-white">
                </div>
                <div class="space-y-2">
                  <p class="text-[10px] font-black uppercase tracking-widest text-slate-500">Google Search Preview</p>
                  <div class="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                    <p class="text-[13px] text-slate-400 truncate">{{ seoPreviewUrl }}</p>
                    <p class="text-[17px] text-blue-600 font-medium leading-tight truncate">{{ seoPreviewTitle }}</p>
                    <p class="text-[13px] text-slate-500 leading-relaxed line-clamp-2">{{ seoPreviewDesc }}</p>
                  </div>
                </div>
              </template>
            </div>
            <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
              <button class="text-sm font-semibold text-slate-400 hover:text-slate-600" @click="closePanel">Cancel</button>
              <button
                :disabled="saving"
                class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider"
                @click="save">
                <UIcon name="i-heroicons-check" class="w-4 h-4" />
                {{ saving ? 'Saving...' : isEditMode ? 'Update Recipe' : 'Save Recipe' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</div>
</template>

