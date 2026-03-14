<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const router = useRouter()
const toast = useToast()

interface Tip { id: string; ingredient: string; tip: string; icon: string }

const getTips = (): Tip[] => JSON.parse(localStorage.getItem('nutrimate_tips') || '[]')
const saveTips = (t: Tip[]) => localStorage.setItem('nutrimate_tips', JSON.stringify(t))

const tips = ref<Tip[]>(getTips())
const isPanelOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<string | null>(null)
const search = ref('')

const emptyForm = () => ({ ingredient: '', tip: '', icon: '🌿' })
const form = ref(emptyForm())

const filtered = computed(() =>
  tips.value.filter(t => t.ingredient.toLowerCase().includes(search.value.toLowerCase()))
)

function openAdd() {
  isEditMode.value = false
  editingId.value = null
  form.value = emptyForm()
  isPanelOpen.value = true
}

function openEdit(t: Tip) {
  isEditMode.value = true
  editingId.value = t.id
  form.value = { ingredient: t.ingredient, tip: t.tip, icon: t.icon }
  isPanelOpen.value = true
}

function closePanel() { isPanelOpen.value = false }

function save() {
  if (!form.value.ingredient || !form.value.tip) {
    toast.add({ title: 'Ingredient and tip are required', color: 'red' })
    return
  }
  const list = getTips()
  if (isEditMode.value && editingId.value) {
    const idx = list.findIndex(t => t.id === editingId.value)
    if (idx !== -1) list[idx] = { ...list[idx]!, ...form.value }
    toast.add({ title: 'Tip updated', color: 'emerald' })
  } else {
    list.push({ ...form.value, id: crypto.randomUUID() })
    toast.add({ title: 'Tip added', color: 'emerald' })
  }
  saveTips(list)
  tips.value = list
  isPanelOpen.value = false
}

function deleteTip(id: string) {
  if (!confirm('Delete this tip?')) return
  const list = getTips().filter(t => t.id !== id)
  saveTips(list)
  tips.value = list
  toast.add({ title: 'Tip deleted', color: 'emerald' })
}

onMounted(() => {
  if (route.query.add === 'true') { openAdd(); router.replace('/admin/tips') }
})
</script>

<template>
  <div class="space-y-5">
    <!-- Toolbar -->
    <div class="flex items-center justify-between gap-4">
      <input v-model="search" placeholder="Search by ingredient..."
        class="w-64 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white">
      <button class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all" @click="openAdd">
        <UIcon name="i-heroicons-plus" class="w-4 h-4" /> Add Tip
      </button>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="t in filtered" :key="t.id"
        class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all group">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">{{ t.icon }}</span>
            <p class="font-black text-slate-900 capitalize tracking-tight">{{ t.ingredient }}</p>
          </div>
          <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all" @click="openEdit(t)">
              <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
            </button>
            <button class="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all" @click="deleteTip(t.id)">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <p class="text-sm text-slate-500 leading-relaxed">{{ t.tip }}</p>
      </div>

      <div v-if="!filtered.length" class="col-span-full py-24 text-center bg-white rounded-2xl border border-slate-100">
        <div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-emerald-300" />
        </div>
        <p class="text-slate-400 font-semibold">No tips yet.</p>
        <button class="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all" @click="openAdd">Add First Tip</button>
      </div>
    </div>
  </div>

  <!-- Slide-over: Teleported to body -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isPanelOpen" class="fixed inset-0 z-[100] flex justify-end">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="closePanel" />
        <Transition name="slide">
          <div v-if="isPanelOpen" class="relative w-full max-w-[440px] bg-white shadow-2xl flex flex-col h-full">
            <!-- Header -->
            <div class="px-6 py-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
              <div>
                <h2 class="font-black text-slate-900 tracking-tighter text-lg">{{ isEditMode ? 'Edit Tip' : 'New Tip' }}</h2>
                <p class="text-xs text-slate-400 mt-0.5">Zero waste ingredient tip</p>
              </div>
              <button class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all" @click="closePanel">
                <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
              </button>
            </div>

            <!-- Form -->
            <div class="flex-1 overflow-y-auto p-6 space-y-5">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Icon (emoji)</label>
                <input v-model="form.icon" type="text" placeholder="🌿"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 text-2xl outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white text-center">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Ingredient Name *</label>
                <input v-model="form.ingredient" type="text" placeholder="e.g. lemon"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-500">Zero Waste Tip *</label>
                <textarea v-model="form.tip" rows="5" placeholder="What to do with this ingredient to avoid waste..."
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white resize-none" />
              </div>
              <!-- Live preview -->
              <div v-if="form.ingredient || form.tip" class="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
                <p class="text-[9px] font-black uppercase tracking-widest text-emerald-500">Preview</p>
                <div class="flex items-center gap-2">
                  <span class="text-xl">{{ form.icon }}</span>
                  <p class="font-black text-slate-800 capitalize">{{ form.ingredient || 'Ingredient' }}</p>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed">{{ form.tip || 'Tip will appear here...' }}</p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
              <button class="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors" @click="closePanel">Cancel</button>
              <button class="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all" @click="save">
                <UIcon name="i-heroicons-check" class="w-4 h-4" />
                {{ isEditMode ? 'Update Tip' : 'Save Tip' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
