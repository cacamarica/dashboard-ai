'use client';

import { useAppDispatch } from '@/hooks/useRedux';
import { setActiveView, toggleSidebar } from '@/store/slices/uiSlice';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery, useTheme, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState, AppState } from '@/store/store';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Raw Materials', icon: <InventoryIcon />, path: '/raw-materials' },
  { text: 'Reorder Alerts', icon: <WarningIcon />, path: '/reorder-alerts' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
  { text: 'AI Assistant', icon: <PsychologyIcon />, path: '/ai-assistant' },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sidebarOpen, activeView } = useSelector((state: RootState) => (state as unknown as AppState).ui);
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path: string, view: string) => {
    router.push(path);
    dispatch(setActiveView(view));
    if (isMobile) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? sidebarOpen : true}
      onClose={() => isMobile && dispatch(toggleSidebar())}
      sx={{
        width: sidebarOpen ? 260 : 70,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 260 : 70,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.3s',
        },
        display: isMobile ? (sidebarOpen ? 'block' : 'none') : 'block',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <IconButton onClick={() => dispatch(toggleSidebar())}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path || activeView === item.text.toLowerCase().replace(' ', '-')}
              onClick={() => handleNavigation(item.path, item.text.toLowerCase().replace(' ', '-'))}
              sx={{
                minHeight: 48,
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: sidebarOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Settings" 
              sx={{ opacity: sidebarOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
