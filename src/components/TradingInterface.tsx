import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrubTrading from './ScrubTrading';
import LiquiditySwiper from './LiquiditySwiper';
import TransactionHistory from './TransactionHistory';

type TradingTab = 'scrub' | 'swipe' | 'history';

const TradingInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TradingTab>('scrub');

  const tabs = [
    { id: 'scrub', label: 'Token Scrubbing', icon: '🔥' },
    { id: 'swipe', label: 'Liquidity Swiping', icon: '⚡' },
    // { id: 'history', label: 'Transaction History', icon: '📊' }
  ] as const;

  return (
    <div className="trading-interface">
      <div className="interface-container">
        <div className="tab-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as TradingTab)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content pixel-panel flame-effect">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="tab-panel"
            >
              {activeTab === 'scrub' && <ScrubTrading />}
              {activeTab === 'swipe' && <LiquiditySwiper />}
              {activeTab === 'history' && <TransactionHistory />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>


    </div>
  );
};

export default TradingInterface;