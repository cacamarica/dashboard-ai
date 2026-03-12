import { useTheme, useMediaQuery } from '@mui/material';

export interface Breakpoints {
  xs: boolean; // small phones
  sm: boolean; // large phones
  md: boolean; // tablets
  lg: boolean; // laptops
  xl: boolean; // desktops
}

/**
 * Hook for responsive design utilities
 */
export function useResponsive() {
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const breakpoints: Breakpoints = {
    xs: isXs,
    sm: isSm,
    md: isMd,
    lg: isLg,
    xl: isXl,
  };

  return {
    ...breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    currentBreakpoint: Object.keys(breakpoints).find(key => breakpoints[key as keyof Breakpoints]) || 'xs',
  };
}

/**
 * Hook to check if device matches specific breakpoint
 */
export function useBreakpoint(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.only(breakpoint));
}

/**
 * Hook to check if device is up from specific breakpoint
 */
export function useBreakpointUp(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}

/**
 * Hook to check if device is down from specific breakpoint
 */
export function useBreakpointDown(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
}
