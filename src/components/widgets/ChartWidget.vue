<script setup lang="ts">
import { computed } from 'vue';
import { Line, Bar, Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { Widget, ChartData } from '../../types/dashboard';
import { useDashboardStore } from '../../stores/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const store = useDashboardStore();
const props = defineProps<{
  widget: Widget;
  data: any[];
}>();

const chartData = computed<ChartData>(() => {
  const labels = props.data.map(d => new Date(d.timestamp).toLocaleDateString());
  const values = props.data.map(d => d.value);

  return {
    labels,
    datasets: [{
      label: props.widget.title,
      data: values,
      borderColor: store.state.isDarkMode ? '#60A5FA' : '#2563eb',
      backgroundColor: store.state.isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
    }]
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: store.state.isDarkMode ? '#E5E7EB' : '#374151',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: store.state.isDarkMode ? '#374151' : '#FFFFFF',
      titleColor: store.state.isDarkMode ? '#E5E7EB' : '#111827',
      bodyColor: store.state.isDarkMode ? '#E5E7EB' : '#374151',
    },
  },
  scales: props.widget.type !== 'pie' ? {
    x: {
      ticks: {
        color: store.state.isDarkMode ? '#E5E7EB' : '#374151',
      },
      grid: {
        color: store.state.isDarkMode ? '#374151' : '#E5E7EB',
      },
    },
    y: {
      ticks: {
        color: store.state.isDarkMode ? '#E5E7EB' : '#374151',
      },
      grid: {
        color: store.state.isDarkMode ? '#374151' : '#E5E7EB',
      },
    },
  } : {},
}));
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{{ widget.title }}</h3>
    <div class="h-64">
      <Line
        v-if="widget.type === 'line'"
        :data="chartData"
        :options="chartOptions"
      />
      <Bar
        v-else-if="widget.type === 'bar'"
        :data="chartData"
        :options="chartOptions"
      />
      <Pie
        v-else-if="widget.type === 'pie'"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>