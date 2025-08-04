import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import TokenSelector from './TokenSelector';
import { TokenInfo } from '../types/token';
import { formatNumber, formatCurrency } from '../utils/formatting';

interface SwipeParams {
  token: TokenInfo | null;
  marginAmount: string;
  leverage: number;
  proxyAddress: string;
  slippage: number;
}

const LiquiditySwiper: React.FC = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [swipeParams, setSwipeParams] = useState<SwipeParams>({
    token: null,
    marginAmount: '',
    leverage: 2,
    proxyAddress: '',
    slippage: 2.0
  });
  const [riskMetrics, setRiskMetrics] = useState({
    liquidationPrice: 0,
    potentialProfit: 0,
    potentialLoss: 0,
    riskRating: 'Low'
  });

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey, connection]);

  useEffect(() => {
    calculateRiskMetrics();
  }, [swipeParams]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const calculateRiskMetrics = () => {
    if (!swipeParams.token || !swipeParams.marginAmount) {
      setRiskMetrics({
        liquidationPrice: 0,
        potentialProfit: 0,
        potentialLoss: 0,
        riskRating: 'Low'
      });
      return;
    }

    const margin = parseFloat(swipeParams.marginAmount);
    const price = swipeParams.token.price;
    const leverage = swipeParams.leverage;
    
    // Simplified risk calculations
    const liquidationPrice = price * (1 - (1 / leverage) * 0.8);
    const potentialProfit = margin * leverage * 0.5; // 50% gain scenario
    const potentialLoss = margin; // Max loss is margin
    
    let riskRating = 'Low';
    if (leverage >= 5) riskRating = 'High';
    else if (leverage >= 3) riskRating = 'Medium';

    setRiskMetrics({
      liquidationPrice,
      potentialProfit,
      potentialLoss,
      riskRating
    });
  };

  const handleTokenSelect = (token: TokenInfo) => {
    setSwipeParams(prev => ({ ...prev, token }));
  };

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setSwipeParams(prev => ({ ...prev, marginAmount: value }));
    }
  };

  const handleLeverageChange = (leverage: number) => {
    setSwipeParams(prev => ({ ...prev, leverage }));
  };

  const handleProxySearch = async () => {
    if (!swipeParams.token) {
      toast.error('Please select a token first');
      return;
    }

    setIsLoading(true);
    try {
      toast.info('Searching for optimal liquidation proxies...');
      
      // Simulate proxy search
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockProxy = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
      setSwipeParams(prev => ({ ...prev, proxyAddress: mockProxy }));
      
      toast.success('Found optimal proxy for liquidation!');
    } catch (error) {
      console.error('Proxy search error:', error);
      toast.error('Failed to find suitable proxy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLiquiditySwipe = async () => {
    if (!publicKey || !swipeParams.token || !swipeParams.marginAmount || !swipeParams.proxyAddress) {
      toast.error('Please complete all fields');
      return;
    }

    if (parseFloat(swipeParams.marginAmount) <= 0) {
      toast.error('Please enter a valid margin amount');
      return;
    }

    setIsLoading(true);
    try {
      toast.info('Creating same-block transaction bundle...');
      
      // Simulate advanced transaction creation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Liquidity swipe transaction bundle created successfully!');
      
      // Reset form
      setSwipeParams(prev => ({ 
        ...prev, 
        marginAmount: '', 
        proxyAddress: '' 
      }));
      fetchBalance();
    } catch (error) {
      console.error('Swipe error:', error);
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const leverageOptions = [2, 3, 5, 7, 10];
  const isFormValid = swipeParams.token && swipeParams.marginAmount && swipeParams.proxyAddress && parseFloat(swipeParams.marginAmount) > 0;

  return (
    <div className="liquidity-swiper">
      <div className="trading-header">
        <h2 className="glow-text">Liquidity Swiping ⚡</h2>
        <p className="description">
          Execute leveraged trades with same-block buy/sell transactions
        </p>
      </div>

      <div className="trading-grid">
        <div className="trading-form">
          <div className="form-section">
            <label className="form-label">Target Token</label>
            <TokenSelector onTokenSelect={handleTokenSelect} />
          </div>

          {swipeParams.token && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="token-info"
            >
              <div className="token-details">
                <img src={swipeParams.token.logoURI} alt={swipeParams.token.symbol} className="token-logo" />
                <div>
                  <h3>{swipeParams.token.name}</h3>
                  <p className="token-price">{formatCurrency(swipeParams.token.price)}</p>
                  <p className="volume-info">24h Volume: {formatCurrency(swipeParams.token.volume24h)}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="form-section">
            <label className="form-label">Margin Amount (SOL)</label>
            <div className="amount-input-container">
              <input
                type="text"
                value={swipeParams.marginAmount}
                onChange={handleMarginChange}
                placeholder="0.00"
                className="neo-input amount-input"
              />
              <button
                className="max-button"
                onClick={() => setSwipeParams(prev => ({ 
                  ...prev, 
                  marginAmount: (balance * 0.5).toString() 
                }))}
              >
                50%
              </button>
            </div>
            <p className="balance-info">Available: {formatNumber(balance)} SOL</p>
          </div>

          <div className="form-section">
            <label className="form-label">Leverage Multiplier</label>
            <div className="leverage-selector">
              {leverageOptions.map((lev) => (
                <button
                  key={lev}
                  className={`leverage-btn ${swipeParams.leverage === lev ? 'active' : ''}`}
                  onClick={() => handleLeverageChange(lev)}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Liquidation Proxy</label>
            <div className="proxy-section">
              <input
                type="text"
                value={swipeParams.proxyAddress}
                onChange={(e) => setSwipeParams(prev => ({ ...prev, proxyAddress: e.target.value }))}
                placeholder="Search or enter proxy address..."
                className="neo-input proxy-input"
              />
              <button
                onClick={handleProxySearch}
                disabled={!swipeParams.token || isLoading}
                className="neo-button search-button"
              >
                {isLoading ? <div className="loading-spinner small" /> : '🔍'}
              </button>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Slippage Tolerance (%)</label>
            <select
              value={swipeParams.slippage}
              onChange={(e) => setSwipeParams(prev => ({ ...prev, slippage: parseFloat(e.target.value) }))}
              className="neo-select"
            >
              <option value={1.0}>1.0%</option>
              <option value={2.0}>2.0%</option>
              <option value={3.0}>3.0%</option>
              <option value={5.0}>5.0%</option>
            </select>
          </div>

          <button
            onClick={handleLiquiditySwipe}
            disabled={!isFormValid || isLoading}
            className={`neo-button swipe-button ${!isFormValid ? 'disabled' : ''}`}
          >
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              `⚡ EXECUTE LIQUIDITY SWIPE`
            )}
          </button>
        </div>

        <div className="risk-analysis">
          <div className="risk-card">
            <h3>📈 Risk Analysis</h3>
            <div className="risk-metrics">
              <div className="metric-row">
                <span>Risk Rating:</span>
                <span className={`risk-rating ${riskMetrics.riskRating.toLowerCase()}`}>
                  {riskMetrics.riskRating}
                </span>
              </div>
              <div className="metric-row">
                <span>Liquidation Price:</span>
                <span>{formatCurrency(riskMetrics.liquidationPrice)}</span>
              </div>
              <div className="metric-row">
                <span>Potential Profit:</span>
                <span className="profit">{formatCurrency(riskMetrics.potentialProfit)}</span>
              </div>
              <div className="metric-row">
                <span>Max Loss:</span>
                <span className="loss">{formatCurrency(riskMetrics.potentialLoss)}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>⚡ Swipe Mechanics</h3>
            <ul>
              <li>• Same-block execution prevents MEV</li>
              <li>• Automated liquidation protection</li>
              <li>• Dynamic slippage adjustment</li>
              <li>• Real-time risk monitoring</li>
              <li>• Instant position closure</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>⚠️ Safety Notice</h3>
            <ul>
              <li>• High leverage = high risk</li>
              <li>• Only use funds you can afford to lose</li>
              <li>• Monitor positions actively</li>
              <li>• Set appropriate stop losses</li>
              <li>• Understand liquidation mechanics</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LiquiditySwiper;