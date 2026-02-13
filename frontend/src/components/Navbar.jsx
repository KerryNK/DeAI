import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition">
          DeAI
        </Link>
        
        {/* Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-400 hover:text-white transition text-sm">Home</Link>
          <Link to="/statistics" className="text-gray-400 hover:text-white transition text-sm">Statistics</Link>
          <Link to="/app/dashboard" className="text-gray-400 hover:text-white transition text-sm">Dashboard</Link>
          <Link to="/app/portfolio" className="text-gray-400 hover:text-white transition text-sm">Portfolio</Link>
          <Link to="/app/history" className="text-gray-400 hover:text-white transition text-sm">History</Link>
        </div>
        
        {/* Wallet */}
        <div className="flex items-center space-x-4">
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
              return (
                <div className="flex items-center space-x-3">
                  {!mounted ? (
                    <div className="w-40 h-10 bg-gray-800 rounded animate-pulse" />
                  ) : account ? (
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gray-900 rounded border border-gray-800 text-sm hover:bg-gray-800 transition cursor-pointer">
                      <span className="text-gray-400 truncate max-w-[120px]">
                        {account.displayName}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={openConnectModal}
                      className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition text-sm font-medium"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
}
