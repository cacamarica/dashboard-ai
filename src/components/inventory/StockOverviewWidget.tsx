import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StockOverviewWidgetProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: number;
  trendNegative?: boolean;
}

export default function StockOverviewWidget({
  title,
  value,
  icon,
  trend,
  trendNegative = false,
}: StockOverviewWidgetProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ fontSize: '2rem' }}>{icon}</Box>
          {trend !== undefined && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: trendNegative ? (trend < 0 ? 'success.main' : 'error.main') : (trend > 0 ? 'success.main' : 'error.main'),
                fontWeight: 600,
              }}
            >
              {trend > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
