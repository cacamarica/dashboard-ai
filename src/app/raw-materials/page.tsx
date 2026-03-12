'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UsageMetricsChart from '@/components/inventory/UsageMetricsChart';

export default function RawMaterialsPage() {
  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Raw Materials Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Detailed view of all raw materials inventory and consumption patterns
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <UsageMetricsChart />
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            All Raw Materials
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete inventory listing with detailed metrics coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
