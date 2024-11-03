<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '../stores/dashboard';
import ChartWidget from './widgets/ChartWidget.vue';
import TableWidget from './widgets/TableWidget.vue';

const store = useDashboardStore();

const widgetData = computed(() => {
  return store.filteredData.reduce((acc, item) => {
    acc[item.id] = item.data;
    return acc;
  }, {} as Record<string, any[]>);
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <template v-for="widget in store.state.widgets" :key="widget.id">
      <ChartWidget
        v-if="widget.type !== 'table'"
        :widget="widget"
        :data="widgetData[widget.id] || []"
      />
      <TableWidget
        v-else
        :widget="widget"
        :data="widgetData[widget.id] || []"
      />
    </template>
  </div>
</template>