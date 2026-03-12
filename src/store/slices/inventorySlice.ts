import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InventoryState {
  topMoving: any[];
  reorderAlerts: any[];
  usageMetrics: any;
  stockOverview: any;
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  topMoving: [],
  reorderAlerts: [],
  usageMetrics: null,
  stockOverview: null,
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setTopMoving: (state, action: PayloadAction<any[]>) => {
      state.topMoving = action.payload;
    },
    setReorderAlerts: (state, action: PayloadAction<any[]>) => {
      state.reorderAlerts = action.payload;
    },
    setUsageMetrics: (state, action: PayloadAction<any>) => {
      state.usageMetrics = action.payload;
    },
    setStockOverview: (state, action: PayloadAction<any>) => {
      state.stockOverview = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTopMoving,
  setReorderAlerts,
  setUsageMetrics,
  setStockOverview,
  setLoading,
  setError,
} = inventorySlice.actions;

export default inventorySlice.reducer;
