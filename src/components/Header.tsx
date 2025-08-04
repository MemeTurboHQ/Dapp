import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Header: React.FC = () => {
  const { connected, publicKey } = useWallet();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img 
            src="/images/memeturbo-logo.png" 
            alt="MemeShifter" 
            className="logo"
          />
          <div className="logo-text">
            <h1 className="glow-text">MEMETURBO</h1>
            <p className="subtitle">Advanced Solana Trading</p>
          </div>
        </div>
        
        <div className="header-actions">
          {connected && publicKey && (
            <div className="wallet-info">
              <span className="wallet-label">Connected:</span>
              <span className="wallet-address">
                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
              </span>
            </div>
          )}
          <WalletMultiButton className="wallet-button" />
        </div>
      </div>
      

    </header>
  );
};

export default Header;