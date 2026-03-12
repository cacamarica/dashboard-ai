import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TopMovingMaterial {
  id: string;
  name: string;
  code: string;
  usageVelocity: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  unit: string;
}

export interface ReorderAlert {
  id: string;
  materialId: string;
  materialName: string;
  currentStock: number;
  reorderPoint: number;
  suggestedQuantity: number;
  urgency: 'critical' | 'warning' | 'info';
}

export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Inventory'],
  endpoints: (builder) => ({
    getTopMovingMaterials: builder.query<TopMovingMaterial[], void>({
      query: () => 'inventory/top-moving',
      providesTags: ['Inventory'],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
    getReorderAlerts: builder.query<ReorderAlert[], void>({
      query: () => 'inventory/reorder',
      providesTags: ['Inventory'],
      keepUnusedDataFor: 180, // Cache for 3 minutes
    }),
    getUsageMetrics: builder.query<any, { period?: string }>({
      query: ({ period = 'week' }) => `inventory/usage-metrics?period=${period}`,
      providesTags: ['Inventory'],
      keepUnusedDataFor: 300,
    }),
    getStockOverview: builder.query<any, void>({
      query: () => 'inventory/stock-overview',
      providesTags: ['Inventory'],
      keepUnusedDataFor: 240,
    }),
  }),
});

export const {
  useGetTopMovingMaterialsQuery,
  useGetReorderAlertsQuery,
  useGetUsageMetricsQuery,
  useGetStockOverviewQuery,
} = inventoryApi;
