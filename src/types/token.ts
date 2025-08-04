export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  tags?: string[];
}

export interface TokenBalance {
  token: TokenInfo;
  balance: number;
  uiAmount: number;
}

export interface PriceData {
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  timestamp: number;
}

export interface TradeQuote {
  inputToken: TokenInfo;
  outputToken: TokenInfo;
  inputAmount: number;
  outputAmount: number;
  slippage: number;
  priceImpact: number;
  minimumReceived: number;
  fee: number;
  route: string[];
}

export interface LiquidityPool {
  address: string;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
  reserveA: number;
  reserveB: number;
  lpSupply: number;
  apy: number;
  volume24h: number;
}