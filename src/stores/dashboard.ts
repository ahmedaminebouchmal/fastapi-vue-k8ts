import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import axios from 'axios';
import type { DashboardState, DataPoint, Widget } from '../types/dashboard';

const API_URL = 'http://localhost:8000/api/v1';

export const useDashboardStore = defineStore('dashboard', () => {
  const state = ref<DashboardState>({
    widgets: [
      {
        id: '1',
        type: 'line',
        title: 'Health Metrics',
        category: 'health',
        position: { x: 0, y: 0 },
        size: { w: 2, h: 2 }
      },
      {
        id: '2',
        type: 'bar',
        title: 'Financial Overview',
        category: 'finance',
        position: { x: 2, y: 0 },
        size: { w: 2, h: 2 }
      },
      {
        id: '3',
        type: 'pie',
        title: 'Technology Distribution',
        category: 'technology',
        position: { x: 0, y: 2 },
        size: { w: 2, h: 2 }
      },
      {
        id: '4',
        type: 'table',
        title: 'Economic Indicators',
        category: 'economy',
        position: { x: 2, y: 2 },
        size: { w: 2, h: 2 }
      }
    ],
    selectedTimeRange: 'week',
    selectedCategories: ['health', 'finance', 'technology', 'economy'],
    isLoading: false,
    error: null,
    isDarkMode: useStorage('isDarkMode', false).value,
  });

  const filteredData = computed(() => {
    return state.value.widgets.map(widget => ({
      id: widget.id,
      data: generateMockData(widget.category, 10)
    }));
  });

  watch(() => state.value.isDarkMode, (newValue) => {
    document.documentElement.classList.toggle('dark', newValue);
  }, { immediate: true });

  function generateMockData(category: string, count: number): DataPoint[] {
    const data: DataPoint[] = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
      data.push({
        value: Math.random() * 100,
        timestamp: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString(),
        category
      });
    }
    
    return data;
  }

  async function fetchData() {
    try {
      state.value.isLoading = true;
      state.value.error = null;
      
      const response = await axios.get(`${API_URL}/metrics`, {
        params: {
          timeRange: state.value.selectedTimeRange,
          categories: state.value.selectedCategories.join(','),
        },
      });
      
      // Process the real data when API is ready
      // For now, using mock data
      
    } catch (error) {
      state.value.error = 'Failed to fetch data. Please try again later.';
    } finally {
      state.value.isLoading = false;
    }
  }

  function updateWidgetLayout(widgets: Widget[]) {
    state.value.widgets = widgets;
  }

  function toggleDarkMode() {
    state.value.isDarkMode = !state.value.isDarkMode;
  }

  return {
    state,
    filteredData,
    fetchData,
    updateWidgetLayout,
    toggleDarkMode,
  };
});