<script setup lang="ts">
import { useDashboardStore } from '../stores/dashboard';

const store = useDashboardStore();
const timeRanges = [
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
  { value: 'year', label: 'Yearly' },
];

const categories = [
  { value: 'health', label: 'Health' },
  { value: 'finance', label: 'Finance' },
  { value: 'technology', label: 'Technology' },
  { value: 'economy', label: 'Economy' },
];
</script>

<template>
  <aside class="w-64 bg-white dark:bg-gray-800 shadow-md">
    <div class="p-4">
      <h2 class="text-xl font-bold mb-6 text-gray-900 dark:text-white">Filters</h2>
      
      <div class="mb-6">
        <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Time Range</h3>
        <select
          v-model="store.state.selectedTimeRange"
          class="w-full border rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        >
          <option
            v-for="range in timeRanges"
            :key="range.value"
            :value="range.value"
          >
            {{ range.label }}
          </option>
        </select>
      </div>
      
      <div class="mb-6">
        <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Categories</h3>
        <div class="space-y-2">
          <label
            v-for="category in categories"
            :key="category.value"
            class="flex items-center text-gray-700 dark:text-gray-300"
          >
            <input
              type="checkbox"
              :value="category.value"
              v-model="store.state.selectedCategories"
              class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            >
            {{ category.label }}
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>