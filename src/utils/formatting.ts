/**
 * Format a number with appropriate decimal places and commas
 */
export const formatNumber = (num: number, decimals = 2): string => {
  if (num === 0) return '0';
  
  // For very small numbers, show more decimals
  if (Math.abs(num) < 0.001) {
    return num.toFixed(8).replace(/\.?0+$/, '');
  }
  
  // For numbers less than 1, show up to 6 decimals
  if (Math.abs(num) < 1) {
    return num.toFixed(6).replace(/\.?0+$/, '');
  }
  
  // For larger numbers, use standard formatting with commas
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (num: number, decimals = 2): string => {
  if (num === 0) return '$0';
  
  // For very small amounts, show more decimals
  if (Math.abs(num) < 0.01) {
    return `$${num.toFixed(8).replace(/\.?0+$/, '')}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Format a percentage
 */
export const formatPercentage = (num: number, decimals = 2): string => {
  return `${num >= 0 ? '+' : ''}${num.toFixed(decimals)}%`;
};

/**
 * Format a large number with K, M, B suffixes
 */
export const formatLargeNumber = (num: number): string => {
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1e9) {
    return `${sign}${(absNum / 1e9).toFixed(1)}B`;
  }
  if (absNum >= 1e6) {
    return `${sign}${(absNum / 1e6).toFixed(1)}M`;
  }
  if (absNum >= 1e3) {
    return `${sign}${(absNum / 1e3).toFixed(1)}K`;
  }
  
  return formatNumber(num);
};

/**
 * Format wallet address to show first and last 4 characters
 */
export const formatWalletAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 8) return address;
  
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

/**
 * Format time duration in human readable format
 */
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

/**
 * Format token amount with appropriate decimals
 */
export const formatTokenAmount = (amount: number, decimals: number): string => {
  const divisor = Math.pow(10, decimals);
  const actualAmount = amount / divisor;
  
  return formatNumber(actualAmount);
};

/**
 * Format APY/APR percentages
 */
export const formatAPY = (apy: number): string => {
  if (apy < 0.01) return '<0.01%';
  if (apy > 10000) return '>10,000%';
  
  return `${formatNumber(apy, 2)}%`;
};