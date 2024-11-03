export interface DataPoint {
  value: number;
  timestamp: string;
  category: string;
}

export interface Widget {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'table';
  title: string;
  category: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

export interface DashboardState {
  widgets: Widget[];
  selectedTimeRange: 'day' | 'week' | 'month' | 'year';
  selectedCategories: string[];
  isLoading: boolean;
  error: string | null;
  isDarkMode: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}