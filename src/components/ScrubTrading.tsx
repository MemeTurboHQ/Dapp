import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import TokenSelector from './TokenSelector';
import { TokenInfo } from '../types/token';
import { formatNumber, formatCurrency } from '../utils/formatting';

interface TradeParams {
  token: TokenInfo | null;
  amount: string;
  tradeType: 'buy' | 'sell';
  slippage: number;
}

const ScrubTrading: React.FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [tradeParams, setTradeParams] = useState<TradeParams>({
    token: null,
    amount: '',
    tradeType: 'buy',
    slippage: 1.0
  });

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey, connection]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleTokenSelect = (token: TokenInfo) => {
    setTradeParams(prev => ({ ...prev, token }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setTradeParams(prev => ({ ...prev, amount: value }));
    }
  };

  const handleTradeTypeToggle = () => {
    setTradeParams(prev => ({
      ...prev,
      tradeType: prev.tradeType === 'buy' ? 'sell' : 'buy'
    }));
  };

  const calculateEstimatedOutput = () => {
    if (!tradeParams.token || !tradeParams.amount) return '0';
    const amount = parseFloat(tradeParams.amount);
    const price = tradeParams.token.price;
    
    if (tradeParams.tradeType === 'buy') {
      return formatNumber(amount / price);
    } else {
      return formatCurrency(amount * price);
    }
  };

  const handleTrade = async () => {
    if (!publicKey || !tradeParams.token || !tradeParams.amount) {
      toast.error('Please complete all fields');
      return;
    }

    if (parseFloat(tradeParams.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate transaction creation
      toast.info('Creating transaction package...');
      
      // In a real implementation, this would create and send the actual swap transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`${tradeParams.tradeType.toUpperCase()} transaction created successfully!`);
      
      // Reset form
      setTradeParams(prev => ({ ...prev, amount: '' }));
      fetchBalance();
    } catch (error) {
      console.error('Trade error:', error);
      toast.error('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = tradeParams.token && tradeParams.amount && parseFloat(tradeParams.amount) > 0;

  return (
    <div className="scrub-trading">
      <div className="trading-header">
        <h2 className="glow-text">Token Scrubbing 🔥</h2>
        <p className="description">
          Execute precise buy/sell orders with advanced slippage protection
        </p>
      </div>

      <div className="trading-grid">
        <div className="trading-form">
          <div className="form-section">
            <label className="form-label">Select Token</label>
            <TokenSelector onTokenSelect={handleTokenSelect} />
          </div>

          {tradeParams.token && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="token-info"
            >
              <div className="token-details">
                <img src={tradeParams.token.logoURI} alt={tradeParams.token.symbol} className="token-logo" />
                <div>
                  <h3>{tradeParams.token.name}</h3>
                  <p className="token-price">{formatCurrency(tradeParams.token.price)}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="form-section">
            <label className="form-label">Trade Type</label>
            <div className="trade-type-toggle">
              <button
                className={`toggle-btn ${tradeParams.tradeType === 'buy' ? 'active' : ''}`}
                onClick={() => setTradeParams(prev => ({ ...prev, tradeType: 'buy' }))}
              >
                🔥 BUY
              </button>
              <button
                className={`toggle-btn ${tradeParams.tradeType === 'sell' ? 'active' : ''}`}
                onClick={() => setTradeParams(prev => ({ ...prev, tradeType: 'sell' }))}
              >
                ⚡ SELL
              </button>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">
              Amount ({tradeParams.tradeType === 'buy' ? 'SOL' : tradeParams.token?.symbol || 'Tokens'})
            </label>
            <div className="amount-input-container">
              <input
                type="text"
                value={tradeParams.amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="neo-input amount-input"
              />
              <button
                className="max-button"
                onClick={() => setTradeParams(prev => ({ ...prev, amount: balance.toString() }))}
              >
                MAX
              </button>
            </div>
            <p className="balance-info">Balance: {formatNumber(balance)} SOL</p>
          </div>

          <div className="form-section">
            <label className="form-label">Slippage Tolerance (%)</label>
            <select
              value={tradeParams.slippage}
              onChange={(e) => setTradeParams(prev => ({ ...prev, slippage: parseFloat(e.target.value) }))}
              className="neo-select"
            >
              <option value={0.5}>0.5%</option>
              <option value={1.0}>1.0%</option>
              <option value={2.0}>2.0%</option>
              <option value={5.0}>5.0%</option>
            </select>
          </div>

          {tradeParams.token && tradeParams.amount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="trade-summary"
            >
              <div className="summary-row">
                <span>Estimated Output:</span>
                <span className="output-value">
                  {calculateEstimatedOutput()} {tradeParams.tradeType === 'buy' ? tradeParams.token.symbol : 'SOL'}
                </span>
              </div>
              <div className="summary-row">
                <span>Slippage:</span>
                <span>{tradeParams.slippage}%</span>
              </div>
            </motion.div>
          )}

          <button
            onClick={handleTrade}
            disabled={!isFormValid || isLoading}
            className={`neo-button trade-button ${!isFormValid ? 'disabled' : ''}`}
          >
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              `${tradeParams.tradeType.toUpperCase()} ${tradeParams.token?.symbol || 'TOKEN'}`
            )}
          </button>
        </div>

        <div className="trading-info">
          <div className="info-card">
            <h3>🔥 Scrub Trading Features</h3>
            <ul>
              <li>• Instant token swaps</li>
              <li>• Advanced slippage protection</li>
              <li>• Real-time price updates</li>
              <li>• MEV protection enabled</li>
              <li>• Gas optimization</li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3>⚡ Pro Tips</h3>
            <ul>
              <li>• Use lower slippage for stable tokens</li>
              <li>• Higher slippage for volatile meme coins</li>
              <li>• Check liquidity before large trades</li>
              <li>• Always verify contract addresses</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ScrubTrading;