<script setup lang="ts">
import type { Widget } from '../../types/dashboard';

defineProps<{
  widget: Widget;
  data: any[];
}>();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{{ widget.title }}</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-if="data.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No data available
            </td>
          </tr>
          <tr v-for="(item, index) in data" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
              {{ new Date(item.timestamp).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
              {{ item.value }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
              {{ item.category }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>