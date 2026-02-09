import { useState } from 'react';

export default function WalletConnect() {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState('');

    const handleConnect = async () => {
        // TODO: Implement actual wallet connection with RainbowKit
        // This is a placeholder for wallet connection logic
        setIsConnected(true);
        setAddress('0x1234...5678');
        setIsOpen(false);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setAddress('');
    };

    return (
        <div className="relative">
            {/* Wallet Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                    isConnected
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-violet-600 hover:bg-violet-700 text-white'
                }`}
            >
                {isConnected ? `${address}` : 'Connect Wallet'}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
                    {isConnected ? (
                        <>
                            <div className="px-4 py-3 border-b border-slate-700">
                                <div className="text-xs text-slate-400">Connected Address</div>
                                <div className="text-sm font-mono text-white">{address}</div>
                            </div>
                            <button
                                onClick={handleDisconnect}
                                className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800 transition"
                            >
                                Disconnect
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleConnect}
                                className="w-full text-left px-4 py-3 text-white hover:bg-slate-800 transition border-b border-slate-700"
                            >
                                MetaMask
                            </button>
                            <button
                                onClick={handleConnect}
                                className="w-full text-left px-4 py-3 text-white hover:bg-slate-800 transition"
                            >
                                WalletConnect
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
