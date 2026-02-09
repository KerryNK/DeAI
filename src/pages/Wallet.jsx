import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Wallet</h1>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-lg text-white/70 mb-6">Connect your wallet to view details</p>
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Wallet</h1>
          <p className="text-white/60">Connected wallet details and balance</p>
        </div>

        {/* Wallet Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Address Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-sm mb-2">Wallet Address</div>
            <div className="font-mono text-lg break-all">{address}</div>
            <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
              Copy Address
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-sm mb-2">ETH Balance</div>
            <div className="text-3xl font-bold">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0 ETH'}
            </div>
          </div>
        </div>

        {/* Wallet Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
              <span>Connected Network</span>
              <span className="text-white/60">Ethereum Mainnet</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
              <span>Wallet Type</span>
              <span className="text-white/60">MetaMask / WalletConnect</span>
            </div>
          </div>
        </div>

        {/* Disconnect Button */}
        <div className="flex gap-4">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
