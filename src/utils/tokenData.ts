import { TokenInfo } from '../types/token';

/**
 * Mock token data for demonstration purposes
 * In a real application, this would come from a token registry or API
 */
export const getMockTokens = (): TokenInfo[] => {
  return [
    {
      address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      name: 'Bonk',
      symbol: 'BONK',
      decimals: 5,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png',
      price: 0.000015,
      priceChange24h: 12.5,
      volume24h: 45000000,
      marketCap: 1200000000,
      liquidity: 15000000,
      tags: ['meme', 'community']
    },
    {
      address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
      name: 'dogwifhat',
      symbol: 'WIF',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm/logo.png',
      price: 2.45,
      priceChange24h: -5.2,
      volume24h: 85000000,
      marketCap: 2450000000,
      liquidity: 35000000,
      tags: ['meme', 'dog']
    },
    {
      address: 'So11111111111111111111111111111111111111112',
      name: 'Wrapped SOL',
      symbol: 'SOL',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      price: 145.67,
      priceChange24h: 3.1,
      volume24h: 125000000,
      marketCap: 68500000000,
      liquidity: 250000000,
      tags: ['wrapped', 'native']
    },
    {
      address: 'HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4',
      name: 'Pepe',
      symbol: 'PEPE',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
      price: 0.000008,
      priceChange24h: 18.7,
      volume24h: 32000000,
      marketCap: 890000000,
      liquidity: 12000000,
      tags: ['meme', 'frog']
    },
    {
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      price: 1.0,
      priceChange24h: 0.01,
      volume24h: 450000000,
      marketCap: 32000000000,
      liquidity: 180000000,
      tags: ['stablecoin', 'usd']
    },
    {
      address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png',
      price: 1.0,
      priceChange24h: -0.02,
      volume24h: 380000000,
      marketCap: 95000000000,
      liquidity: 220000000,
      tags: ['stablecoin', 'usd']
    },
    {
      address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      name: 'Marinade staked SOL',
      symbol: 'mSOL',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
      price: 158.23,
      priceChange24h: 2.8,
      volume24h: 25000000,
      marketCap: 1800000000,
      liquidity: 45000000,
      tags: ['staking', 'liquid']
    },
    {
      address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
      name: 'Ethereum (Wormhole)',
      symbol: 'ETH',
      decimals: 8,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png',
      price: 3245.12,
      priceChange24h: 4.2,
      volume24h: 95000000,
      marketCap: 385000000000,
      liquidity: 120000000,
      tags: ['wrapped', 'ethereum']
    },
    {
      address: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh',
      name: 'Bitcoin (Wormhole)',
      symbol: 'BTC',
      decimals: 8,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png',
      price: 68450.0,
      priceChange24h: 1.8,
      volume24h: 185000000,
      marketCap: 1350000000000,
      liquidity: 95000000,
      tags: ['wrapped', 'bitcoin']
    },
    {
      address: 'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1',
      name: 'Saber',
      symbol: 'SBR',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1/logo.png',
      price: 0.012,
      priceChange24h: -8.5,
      volume24h: 3500000,
      marketCap: 45000000,
      liquidity: 8000000,
      tags: ['defi', 'amm']
    },
    {
      address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
      name: 'Orca',
      symbol: 'ORCA',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png',
      price: 0.85,
      priceChange24h: 6.3,
      volume24h: 12000000,
      marketCap: 125000000,
      liquidity: 25000000,
      tags: ['defi', 'amm']
    },
    {
      address: 'RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a',
      name: 'Rollbit Coin',
      symbol: 'RLB',
      decimals: 2,
      logoURI: 'https://assets.coingecko.com/coins/images/30171/large/RLB.png',
      price: 0.045,
      priceChange24h: -12.3,
      volume24h: 8500000,
      marketCap: 285000000,
      liquidity: 15000000,
      tags: ['gaming', 'casino']
    }
  ];
};

/**
 * Get token by address
 */
export const getTokenByAddress = (address: string): TokenInfo | undefined => {
  const tokens = getMockTokens();
  return tokens.find(token => token.address === address);
};

/**
 * Get token by symbol
 */
export const getTokenBySymbol = (symbol: string): TokenInfo | undefined => {
  const tokens = getMockTokens();
  return tokens.find(token => token.symbol.toLowerCase() === symbol.toLowerCase());
};

/**
 * Search tokens by name or symbol
 */
export const searchTokens = (query: string): TokenInfo[] => {
  const tokens = getMockTokens();
  const searchTerm = query.toLowerCase();
  
  return tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm) ||
    token.symbol.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get popular/trending tokens
 */
export const getTrendingTokens = (): TokenInfo[] => {
  const tokens = getMockTokens();
  // Sort by volume and return top 5
  return tokens
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 5);
};

/**
 * Get meme tokens
 */
export const getMemeTokens = (): TokenInfo[] => {
  const tokens = getMockTokens();
  return tokens.filter(token => token.tags?.includes('meme'));
};