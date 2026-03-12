'use client';

import { useEffect, useState } from 'react';
import { analyticsService } from '@/services/analyticsService';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Prediction {
  materialId: string;
  materialName: string;
  predictedDemand: number;
  confidence: number;
  recommendedAction: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function PredictiveInsights() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const data = await analyticsService.generatePredictions();
        setPredictions(data);
      } catch (error) {
        console.error('Error loading predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPredictions();
  }, []);

  const getRiskColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight="bold">
            AI-Powered Predictive Insights
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Machine learning-based demand forecasting and recommendations
        </Typography>

        <List>
          {predictions.map((prediction) => (
            <ListItem
              key={prediction.materialId}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                mb: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <ListItemIcon>
                {prediction.riskLevel === 'high' && (
                  <WarningAmberIcon color="error" />
                )}
                {prediction.riskLevel === 'medium' && (
                  <TrendingUpIcon color="warning" />
                )}
                {prediction.riskLevel === 'low' && (
                  <CheckCircleIcon color="success" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {prediction.materialName}
                    </Typography>
                    <Chip
                      label={`${prediction.confidence}% confidence`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2">
                      Predicted Demand: <strong>{prediction.predictedDemand.toLocaleString()} units</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {prediction.recommendedAction}
                    </Typography>
                  </>
                }
              />
              <Chip
                label={prediction.riskLevel.toUpperCase()}
                size="small"
                color={getRiskColor(prediction.riskLevel)}
              />
            </ListItem>
          ))}
        </List>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="caption">
            💡 These insights are generated using ML algorithms analyzing historical consumption patterns, 
            seasonal trends, and production schedules.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}
