'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '@/hooks/useRedux';
import { addQuery, setIsProcessing } from '@/store/slices/aiSlice';
import { aiService } from '@/services/aiService';
import type { RootState, AppState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function AIAssistant() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const isProcessing = useSelector((state: RootState) => (state as unknown as AppState).ai.isProcessing);

  const handleAskAI = async () => {
    if (!query.trim()) return;

    dispatch(addQuery(query));
    dispatch(setIsProcessing(true));
    setResponse(null);

    try {
      // Use independent AI service (Qwen model)
      const result = await aiService.processQuery(query);
      setResponse(result.response);
    } catch (error) {
      console.error('AI query error:', error);
      setResponse('Sorry, I encountered an error processing your request. Please try again.');
    } finally {
      dispatch(setIsProcessing(false));
    }
  };

  // Removed unused generateMockResponse function

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PsychologyIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight="bold">
            AI Assistant
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ask me anything about inventory, reorder points, usage trends, or forecasts
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Try: &quot;Show me top 10 fast-moving raw materials&quot; or &quot;What materials need reordering?&quot;"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isProcessing}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setQuery('')}
                  edge="end"
                  disabled={!query || isProcessing}
                >
                  <ClearIcon />
                </IconButton>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAskAI}
                  disabled={!query.trim() || isProcessing}
                  sx={{ ml: 1 }}
                >
                  Ask
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {isProcessing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {response && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">{response}</Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
