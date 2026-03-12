'use client';

import { useGetUsageMetricsQuery } from '@/store/api/inventoryApi';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

// Mock data for demonstration
const mockUsageData = {
  week: [
    { day: 'Mon', consumption: 1250, forecast: 1200 },
    { day: 'Tue', consumption: 1480, forecast: 1450 },
    { day: 'Wed', consumption: 1320, forecast: 1380 },
    { day: 'Thu', consumption: 1590, forecast: 1520 },
    { day: 'Fri', consumption: 1420, forecast: 1480 },
    { day: 'Sat', consumption: 980, forecast: 1050 },
    { day: 'Sun', consumption: 750, forecast: 800 },
  ],
  month: [
    { week: 'Week 1', consumption: 8500, forecast: 8200 },
    { week: 'Week 2', consumption: 9200, forecast: 9000 },
    { week: 'Week 3', consumption: 8800, forecast: 9100 },
    { week: 'Week 4', consumption: 9500, forecast: 9300 },
  ],
};

type ChartDataPoint = { day: string; consumption: number; forecast: number } | { week: string; consumption: number; forecast: number };

export default function UsageMetricsChart() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error } = useGetUsageMetricsQuery({ period });

  const chartData: ChartDataPoint[] = mockUsageData[period];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading usage metrics</Alert>;
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Usage Metrics & Forecast
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={period}
              label="Period"
              onChange={(e) => setPeriod(e.target.value as 'week' | 'month')}
            >
              <MenuItem value="week">Weekly</MenuItem>
              <MenuItem value="month">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={period === 'week' ? 'day' : 'week'} 
                label={{ value: period === 'week' ? 'Day' : 'Week', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Units', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="consumption"
                name="Actual Consumption"
                stroke="#1976d2"
                fillOpacity={1}
                fill="url(#colorConsumption)"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                name="Forecast"
                stroke="#4caf50"
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorForecast)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 150 }}>
            <Typography variant="body2" color="text.secondary">
              Average Daily Usage
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {period === 'week' ? '1,256' : '8,750'} units
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 150 }}>
            <Typography variant="body2" color="text.secondary">
              Peak Usage
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {period === 'week' ? '1,590' : '9,500'} units
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 150 }}>
            <Typography variant="body2" color="text.secondary">
              Forecast Accuracy
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="success.main">
              94.2%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
