import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AIState {
  queryHistory: string[];
  insights: any[];
  isProcessing: boolean;
  currentQuery: string;
}

const initialState: AIState = {
  queryHistory: [],
  insights: [],
  isProcessing: false,
  currentQuery: '',
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setQueryHistory: (state, action: PayloadAction<string[]>) => {
      state.queryHistory = action.payload;
    },
    addQuery: (state, action: PayloadAction<string>) => {
      state.queryHistory.push(action.payload);
    },
    setInsights: (state, action: PayloadAction<any[]>) => {
      state.insights = action.payload;
    },
    addInsight: (state, action: PayloadAction<any>) => {
      state.insights.push(action.payload);
    },
    setIsProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    clearHistory: (state) => {
      state.queryHistory = [];
    },
  },
});

export const {
  setQueryHistory,
  addQuery,
  setInsights,
  addInsight,
  setIsProcessing,
  setCurrentQuery,
  clearHistory,
} = aiSlice.actions;

export default aiSlice.reducer;
