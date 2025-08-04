import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { formatNumber, formatCurrency } from '../utils/formatting';

interface Transaction {
  id: string;
  type: 'scrub' | 'swipe';
  action: 'buy' | 'sell' | 'leverage';
  token: string;
  amount: number;
  price: number;
  value: number;
  status: 'pending' | 'success' | 'failed';
  timestamp: Date;
  signature?: string;
  leverage?: number;
}

const TransactionHistory: React.FC = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'scrub' | 'swipe'>('all');

  useEffect(() => {
    if (publicKey) {
      loadTransactionHistory();
    }
  }, [publicKey]);

  const loadTransactionHistory = async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch transaction history
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          type: 'scrub',
          action: 'buy',
          token: 'BONK',
          amount: 1000000,
          price: 0.000015,
          value: 15,
          status: 'success',
          timestamp: new Date(Date.now() - 3600000),
          signature: '5xJ7K...',
        },
        {
          id: '2',
          type: 'swipe',
          action: 'leverage',
          token: 'WIF',
          amount: 500,
          price: 2.45,
          value: 1225,
          status: 'success',
          timestamp: new Date(Date.now() - 7200000),
          signature: '3mL9P...',
          leverage: 5,
        },
        {
          id: '3',
          type: 'scrub',
          action: 'sell',
          token: 'PEPE',
          amount: 2000000,
          price: 0.000008,
          value: 16,
          status: 'failed',
          timestamp: new Date(Date.now() - 10800000),
          signature: '8nQ2R...',
        },
        {
          id: '4',
          type: 'swipe',
          action: 'leverage',
          token: 'DOGE',
          amount: 1000,
          price: 0.08,
          value: 80,
          status: 'pending',
          timestamp: new Date(Date.now() - 14400000),
          leverage: 3,
        },
      ];
      
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error loading transaction history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.type === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getActionIcon = (type: string, action: string) => {
    if (type === 'swipe') return '⚡';
    return action === 'buy' ? '🔥' : '💰';
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  if (!publicKey) {
    return (
      <div className="transaction-history">
        <div className="no-wallet">
          <h2>🔗 Connect Wallet</h2>
          <p>Please connect your wallet to view transaction history</p>
        </div>
        

      </div>
    );
  }

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h2 className="glow-text">Transaction History 📊</h2>
        <div className="filter-controls">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'scrub' ? 'active' : ''}`}
            onClick={() => setFilter('scrub')}
          >
            🔥 Scrub
          </button>
          <button
            className={`filter-btn ${filter === 'swipe' ? 'active' : ''}`}
            onClick={() => setFilter('swipe')}
          >
            ⚡ Swipe
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span>Loading transaction history...</span>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="no-transactions">
          <h3>No Transactions Found</h3>
          <p>Start trading to see your transaction history here</p>
        </div>
      ) : (
        <div className="transactions-container">
          {filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`transaction-item ${tx.status}`}
            >
              <div className="tx-header">
                <div className="tx-type">
                  <span className="action-icon">{getActionIcon(tx.type, tx.action)}</span>
                  <span className="type-label">
                    {tx.type.toUpperCase()} {tx.action.toUpperCase()}
                  </span>
                  {tx.leverage && (
                    <span className="leverage-badge">{tx.leverage}x</span>
                  )}
                </div>
                <div className="tx-status">
                  <span className="status-icon">{getStatusIcon(tx.status)}</span>
                  <span className="status-label">{tx.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="tx-details">
                <div className="detail-row">
                  <span className="label">Token:</span>
                  <span className="value token-name">{tx.token}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Amount:</span>
                  <span className="value">{formatNumber(tx.amount)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Price:</span>
                  <span className="value">{formatCurrency(tx.price)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Total Value:</span>
                  <span className="value total-value">{formatCurrency(tx.value)}</span>
                </div>
              </div>

              <div className="tx-footer">
                <span className="timestamp">{formatTimestamp(tx.timestamp)}</span>
                {tx.signature && (
                  <button className="signature-btn" title={`Signature: ${tx.signature}`}>
                    🔗 {tx.signature}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <style>{`
        .transaction-history {
          padding: 30px;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .history-header h2 {
          font-size: 2.5rem;
          color: #FFD700;
          margin: 0;
        }

        .filter-controls {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          padding: 10px 20px;
          background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
          border: 2px solid #FF4500;
          border-radius: 8px;
          color: #FFD700;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .filter-btn.active {
          background: linear-gradient(145deg, #FF4500, #FF6347);
          color: #000000;
        }

        .filter-btn:hover:not(.active) {
          background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 50px;
          gap: 20px;
          color: #888;
        }

        .no-transactions {
          text-align: center;
          padding: 50px;
          color: #888;
        }

        .no-transactions h3 {
          color: #FFD700;
          margin-bottom: 15px;
        }

        .transactions-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .transaction-item {
          background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
          border: 2px solid #FF4500;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .transaction-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 69, 0, 0.3);
        }

        .transaction-item.success {
          border-color: #4CAF50;
        }

        .transaction-item.failed {
          border-color: #f44336;
        }

        .transaction-item.pending {
          border-color: #FFA500;
        }

        .tx-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .tx-type {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .action-icon {
          font-size: 1.2rem;
        }

        .type-label {
          color: #FFD700;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .leverage-badge {
          background: linear-gradient(145deg, #FF6347, #FF4500);
          color: #000000;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .tx-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-icon {
          font-size: 1rem;
        }

        .status-label {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .tx-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 15px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
        }

        .label {
          color: #888;
          font-size: 0.9rem;
        }

        .value {
          color: #FFD700;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .token-name {
          color: #FF6347;
          font-weight: 700;
        }

        .total-value {
          color: #4CAF50;
          font-weight: 700;
        }

        .tx-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #333;
          padding-top: 15px;
        }

        .timestamp {
          color: #888;
          font-size: 0.8rem;
        }

        .signature-btn {
          background: none;
          border: 1px solid #333;
          color: #888;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .signature-btn:hover {
          border-color: #FFD700;
          color: #FFD700;
        }

        @media (max-width: 768px) {
          .history-header {
            flex-direction: column;
            align-items: stretch;
          }

          .history-header h2 {
            font-size: 2rem;
            text-align: center;
          }

          .tx-details {
            grid-template-columns: 1fr;
          }

          .tx-footer {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionHistory;