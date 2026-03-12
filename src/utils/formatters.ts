/**
 * Format large numbers with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Format currency values
 */
export const formatCurrency = (amount: number, currency: string = 'IDR'): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format dates
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return d.toLocaleDateString('id-ID');
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  // Relative format
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return d.toLocaleDateString('id-ID');
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format large quantities with units
 */
export const formatQuantity = (quantity: number, unit: string): string => {
  if (quantity >= 1000000) {
    return `${(quantity / 1000000).toFixed(1)}M ${unit}`;
  }
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)}K ${unit}`;
  }
  return `${formatNumber(quantity)} ${unit}`;
};

/**
 * Calculate trend direction
 */
export const getTrendDirection = (current: number, previous: number): 'up' | 'down' | 'stable' => {
  const change = ((current - previous) / previous) * 100;
  
  if (Math.abs(change) < 1) return 'stable';
  return change > 0 ? 'up' : 'down';
};

/**
 * Calculate percentage change
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
};
