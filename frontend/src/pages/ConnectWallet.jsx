import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';

export default function ConnectWallet() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate wallet connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Wallet connected successfully!');
  };

  return (
    <WalletConnect
      onConnect={handleConnect}
      isLoading={isLoading}
      title="Connect Your Wallet"
      subtitle="Securely connect your wallet to access your portfolio and manage your investments"
      buttonText="Connect Wallet"
    />
  );
}
