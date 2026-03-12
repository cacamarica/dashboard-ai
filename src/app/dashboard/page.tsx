'use client';

import { useGetTopMovingMaterialsQuery, useGetReorderAlertsQuery, useGetStockOverviewQuery } from '@/store/api/inventoryApi';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TopMovingTable from '@/components/inventory/TopMovingTable';
import ReorderAlertCard from '@/components/inventory/ReorderAlertCard';
import StockOverviewWidget from '@/components/inventory/StockOverviewWidget';
import AIAssistant from '@/components/ai/AIAssistant';
import UsageMetricsChart from '@/components/inventory/UsageMetricsChart';

export default function DashboardPage() {
  const { data: topMovingData, isLoading: loadingTop, error: errorTop } = useGetTopMovingMaterialsQuery();
  const { data: reorderData, isLoading: loadingReorder } = useGetReorderAlertsQuery();
  const { data: stockOverview, isLoading: loadingStock } = useGetStockOverviewQuery();

  const loading = loadingTop || loadingReorder || loadingStock;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Inventory Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pupuk Sriwijaya - Warehouse & Production Operations Overview
        </Typography>
      </Box>

      {/* AI Assistant */}
      <Box sx={{ mb: 4 }}>
        <AIAssistant />
      </Box>

      {/* Stock Overview Widgets */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StockOverviewWidget 
            title="Total Materials" 
            value={stockOverview?.totalMaterials || 156} 
            icon="📦"
            trend={8.2}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StockOverviewWidget 
            title="Low Stock Items" 
            value={stockOverview?.lowStockItems || 12} 
            icon="⚠️"
            trend={-3.5}
            trendNegative
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StockOverviewWidget 
            title="Pending Orders" 
            value={stockOverview?.pendingOrders || 8} 
            icon="🚚"
            trend={15.3}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StockOverviewWidget 
            title="Turnover Rate" 
            value={`${stockOverview?.turnoverRate || 87.5}%`} 
            icon="📊"
            trend={5.1}
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Top 10 Fast-Moving Materials */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Top 10 Fast-Moving Raw Materials
              </Typography>
              {errorTop ? (
                <Alert severity="error">Error loading top moving materials</Alert>
              ) : (
                <TopMovingTable data={topMovingData || []} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Reorder Alerts */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Reorder Alerts
              </Typography>
              <ReorderAlertCard alerts={reorderData || []} />
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Metrics Chart */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <UsageMetricsChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
