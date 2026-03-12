import { ReorderAlert } from '@/store/api/inventoryApi';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

interface ReorderAlertCardProps {
  alerts: ReorderAlert[];
}

export default function ReorderAlertCard({ alerts }: ReorderAlertCardProps) {
  const getUrgencyConfig = (urgency?: 'critical' | 'warning' | 'info') => {
    switch (urgency) {
      case 'critical':
        return {
          icon: <ErrorIcon color="error" />,
          alertColor: 'error',
          bgColor: '#ffebee',
          buttonColor: 'error' as const,
        };
      case 'warning':
        return {
          icon: <WarningIcon color="warning" />,
          alertColor: 'warning',
          bgColor: '#fff3e0',
          buttonColor: 'warning' as const,
        };
      case 'info':
        return {
          icon: <InfoIcon color="info" />,
          alertColor: 'info',
          bgColor: '#e3f2fd',
          buttonColor: 'primary' as const, // MUI Button doesn't have 'info' color
        };
      default:
        // Default to warning if urgency is not specified
        return {
          icon: <WarningIcon color="warning" />,
          alertColor: 'warning',
          bgColor: '#fff3e0',
          buttonColor: 'warning' as const,
        };
    }
  };

  if (!alerts || alerts.length === 0) {
    return (
      <Alert severity="success">
        All materials are at optimal stock levels
      </Alert>
    );
  }

  return (
    <Box>
      <List sx={{ p: 0 }}>
        {alerts.map((alert, index) => {
          const config = getUrgencyConfig(alert.urgency);
          
          return (
            <Box key={alert.id}>
              <ListItem
                sx={{
                  backgroundColor: config.bgColor,
                  borderRadius: 1,
                  mb: 1,
                  alignItems: 'flex-start',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {config.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="bold">
                      {alert.materialName}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" component="div">
                        Current: <strong>{alert.currentStock}</strong> | 
                        Reorder Point: <strong>{alert.reorderPoint}</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Suggested Order: {((alert as ReorderAlert & { suggested_quantity?: number }).suggestedQuantity ?? (alert as any).suggested_quantity)?.toLocaleString() ?? 'N/A'} units
                      </Typography>
                    </Box>
                  }
                />
                <Button
                  size="small"
                  variant="outlined"
                  color={config.buttonColor}
                  sx={{ ml: 1 }}
                >
                  Order
                </Button>
              </ListItem>
              {index < alerts.length - 1 && <Divider />}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
