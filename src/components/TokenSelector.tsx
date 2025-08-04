import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenInfo } from '../types/token';
import { getMockTokens } from '../utils/tokenData';

interface TokenSelectorProps {
  onTokenSelect: (token: TokenInfo) => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ onTokenSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockTokens = getMockTokens();
      setTokens(mockTokens);
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: TokenInfo) => {
    setSelectedToken(token);
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="token-selector">
      <button
        className="selector-button neo-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <div className="selected-token">
            <img src={selectedToken.logoURI} alt={selectedToken.symbol} className="token-icon" />
            <span>{selectedToken.symbol}</span>
          </div>
        ) : (
          <span>Select Token</span>
        )}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="dropdown-panel"
          >
            <div className="search-container">
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neo-input search-input"
                autoFocus
              />
            </div>

            <div className="token-list">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner" />
                  <span>Loading tokens...</span>
                </div>
              ) : filteredTokens.length === 0 ? (
                <div className="no-results">
                  No tokens found for "{searchTerm}"
                </div>
              ) : (
                filteredTokens.map((token) => (
                  <motion.button
                    key={token.address}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="token-item"
                    onClick={() => handleTokenSelect(token)}
                  >
                    <img src={token.logoURI} alt={token.symbol} className="token-icon" />
                    <div className="token-info">
                      <div className="token-primary">
                        <span className="token-symbol">{token.symbol}</span>
                        <span className="token-price">${token.price.toFixed(6)}</span>
                      </div>
                      <div className="token-secondary">
                        <span className="token-name">{token.name}</span>
                        <span className={`price-change ${token.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
                          {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default TokenSelector;