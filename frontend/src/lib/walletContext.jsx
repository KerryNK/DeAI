"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const accounts = await web3Accounts();
        if (accounts && accounts.length > 0) setAccount(accounts[0].address);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const connect = async () => {
    setLoading(true);
    setError(null);
    try {
      await web3Enable('DeAI Nexus');
      const accounts = await web3Accounts();
      if (!accounts || accounts.length === 0) {
        setError('No wallet accounts found');
      } else {
        setAccount(accounts[0].address);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ account, loading, error, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
