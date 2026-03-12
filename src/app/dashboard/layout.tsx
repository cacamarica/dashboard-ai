'use client';

import Navbar from '@/components/ui/Layout/Navbar';
import Sidebar from '@/components/ui/Layout/Sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';
import type { RootState, AppState } from '@/store/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarOpen = useSelector((state: RootState) => (state as unknown as AppState).ui.sidebarOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: '64px',
          ml: { 
            xs: sidebarOpen ? '260px' : '70px',
            md: sidebarOpen ? '260px' : '70px',
          },
          transition: 'margin-left 0.3s',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
