'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { reportService } from '@/services/reportService';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = async (period: 'daily' | 'weekly' | 'monthly') => {
    setGenerating(true);
    try {
      const report = await reportService.generateReport(period);
      console.log('Report generated:', report);
      // In a real app, this would trigger a download or display the report
      alert(`Report generated: ${report.title}\nCheck console for details`);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-generated reports with executive summaries and actionable insights
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Generate Report
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select report period to generate comprehensive inventory analysis
          </Typography>

          <ButtonGroup variant="contained" disabled={generating}>
            <Button
              onClick={() => handleGenerateReport('daily')}
              startIcon={<DownloadIcon />}
            >
              Daily Report
            </Button>
            <Button
              onClick={() => handleGenerateReport('weekly')}
              startIcon={<DownloadIcon />}
            >
              Weekly Report
            </Button>
            <Button
              onClick={() => handleGenerateReport('monthly')}
              startIcon={<DownloadIcon />}
            >
              Monthly Report
            </Button>
          </ButtonGroup>

          <Button
            variant="outlined"
            startIcon={<ScheduleIcon />}
            sx={{ ml: 2 }}
            disabled={generating}
          >
            Schedule Automated Reports
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Recent Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Report history and archived documents will appear here...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
