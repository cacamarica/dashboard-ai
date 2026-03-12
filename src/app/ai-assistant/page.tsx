'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AIAssistant from '@/components/ai/AIAssistant';
import PredictiveInsights from '@/components/ai/PredictiveInsight';

export default function AIAssistantPage() {
  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          AI Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Natural language interface for inventory queries and insights
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <AIAssistant />
      </Box>

      <Box sx={{ mb: 4 }}>
        <PredictiveInsights />
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            AI Capabilities
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            • Natural Language Queries - Ask questions in plain English
          </Typography>
          <Typography variant="body2">
            • Predictive Analytics - ML-powered demand forecasting
          </Typography>
          <Typography variant="body2">
            • Anomaly Detection - Identify unusual patterns
          </Typography>
          <Typography variant="body2">
            • Automated Reports - AI-generated summaries and insights
          </Typography>
          <Typography variant="body2">
            • Smart Recommendations - Data-driven decision support
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
