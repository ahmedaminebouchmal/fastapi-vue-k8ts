<script setup lang="ts">
import { useDashboardStore } from '../stores/dashboard';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

const store = useDashboardStore();
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-3">
          <img src="../assets/logo.svg" alt="Analytics Dashboard" class="h-8 w-8" />
          <span class="text-xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</span>
        </div>
        
        <div class="flex items-center">
          <button
            @click="store.toggleDarkMode"
            class="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
          >
            <SunIcon v-if="store.state.isDarkMode" class="h-6 w-6" />
            <MoonIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>