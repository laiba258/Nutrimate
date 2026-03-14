<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)

const stats = [
  { label: 'Total Recipes', value: '24', icon: 'i-heroicons-book-open', color: 'emerald' },
  { label: 'Active Users', value: '1.2k', icon: 'i-heroicons-users', color: 'blue' },
  { label: 'Zero Waste Tips', value: '15', icon: 'i-heroicons-leaf', color: 'teal' },
  { label: 'Avg. Budget', value: 'Rs. 450', icon: 'i-heroicons-banknotes', color: 'orange' }
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'costLevel', label: 'Cost' },
  { key: 'calories', label: 'Calories' },
  { key: 'actions', label: 'Actions' }
]

const recipes = [
  { title: 'Quinoa Salad', costLevel: 'Low', calories: '320' },
  { title: 'Beef Stir Fry', costLevel: 'Medium', calories: '540' },
]
</script>
<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p class="text-slate-500 text-sm">Manage your smart recipe database</p>
      </div>
      <UButton 
        icon="i-heroicons-plus" 
        size="md" 
        color="emerald" 
        label="Add New Recipe" 
        @click="isModalOpen = true"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label" class="border-none shadow-sm">
        <div class="flex items-center gap-4">
          <div :class="`p-3 rounded-xl bg-${stat.color}-50`">
            <UIcon :name="stat.icon" :class="`w-6 h-6 text-${stat.color}-500`" />
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase font-semibold tracking-wider">{{ stat.label }}</p>
            <p class="text-xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <UCard class="border-none shadow-sm overflow-hidden">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-bold">Recent Recipes</h3>
          <UInput icon="i-heroicons-magnifying-glass" placeholder="Search recipes..." />
        </div>
      </template>

      <UTable :rows="recipes" :columns="columns">
        <template #costLevel-data="{ row }">
          <UBadge :color="row.costLevel === 'Low' ? 'emerald' : 'orange'" variant="subtle">
            {{ row.costLevel }}
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-square" />
          <UButton color="red" variant="ghost" icon="i-heroicons-trash" />
        </template>
      </UTable>
    </UCard>

    <UModal v-model="isModalOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Add New Recipe</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false" />
          </div>
        </template>

        <div class="p-4 space-y-4">
          <UFormGroup label="Recipe Title">
            <UInput placeholder="e.g. Healthy Chicken Karahi" />
          </UFormGroup>
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Calories">
              <UInput type="number" placeholder="450" />
            </UFormGroup>
            <UFormGroup label="Cost Level">
              <USelect :options="['Low', 'Medium', 'High']" />
            </UFormGroup>
          </div>
          <UFormGroup label="Zero Waste Tip">
            <UTextarea placeholder="How to use leftovers..." />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="gray" variant="ghost" label="Cancel" @click="isModalOpen = false" />
            <UButton color="emerald" label="Save Recipe" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

