'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReorderAlertCard from '@/components/inventory/ReorderAlertCard';
import PredictiveInsights from '@/components/ai/PredictiveInsight';
import { useGetReorderAlertsQuery } from '@/store/api/inventoryApi';

export default function ReorderAlertsPage() {
  const { data: alerts, error } = useGetReorderAlertsQuery();

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Reorder Alerts
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered reorder point predictions and automated purchase recommendations
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <PredictiveInsights />
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Active Alerts
          </Typography>
          {error ? (
            <Typography color="error">Error loading alerts</Typography>
          ) : (
            <ReorderAlertCard alerts={alerts || []} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
