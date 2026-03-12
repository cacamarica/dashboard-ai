'use client';

import { useAppDispatch } from '@/hooks/useRedux';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { useSelector } from 'react-redux';
import type { RootState, AppState } from '@/store/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

export default function Navbar() {
  const dispatch = useAppDispatch();
  // sidebarOpen is used for responsive layout logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sidebarOpen = useSelector((state: RootState) => (state as unknown as AppState).ui.sidebarOpen);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(toggleSidebar())}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Pupuk Sriwijaya - Inventory Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
