import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './slices/inventorySlice';
import aiReducer from './slices/aiSlice';
import uiReducer from './slices/uiSlice';
import { inventoryApi } from './api/inventoryApi';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    ai: aiReducer,
    ui: uiReducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inventoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Explicit state interface for better type safety
export interface AppState {
  inventory: ReturnType<typeof inventoryReducer>;
  ai: ReturnType<typeof aiReducer>;
  ui: ReturnType<typeof uiReducer>;
}
