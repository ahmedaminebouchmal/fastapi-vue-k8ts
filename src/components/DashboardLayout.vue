<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import DashboardNavbar from './DashboardNavbar.vue';
import DashboardSidebar from './DashboardSidebar.vue';
import DashboardGrid from './DashboardGrid.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import ErrorMessage from './ErrorMessage.vue';

const store = useDashboardStore();

onMounted(() => {
  store.fetchData();
});
</script>

<template>
  <div :class="['h-screen flex flex-col', { 'dark': store.state.isDarkMode }]">
    <DashboardNavbar />
    <div class="flex flex-1 overflow-hidden">
      <DashboardSidebar />
      <main class="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
        <div v-if="store.state.isLoading">
          <LoadingSpinner />
        </div>
        
        <div v-else-if="store.state.error">
          <ErrorMessage :message="store.state.error" />
        </div>
        
        <div v-else>
          <DashboardGrid />
        </div>
      </main>
    </div>
  </div>
</template>