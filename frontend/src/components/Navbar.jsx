import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar sticky top-0 z-50 px-6 py-5 backdrop-blur-xl bg-black/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black text-white drop-shadow-lg hover:text-white/80 transition">
          DeAI <span className="text-violet-400">Nexus</span>
        </Link>
        
        {/* Navigation - Pure B&W */}
        <div className="hidden md:flex space-x-1">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/statistics" className="nav-link">Statistics</Link>
          <Link to="/app/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/app/scoring" className="nav-link">Scoring</Link>
          <Link to="/app/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/app/history" className="nav-link">History</Link>
        </div>
        
        {/* Wallet - B&W with RainbowKit */}
        <div className="flex items-center space-x-4">
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
              return (
                <div className="flex items-center space-x-3">
                  {!mounted ? (
                    <div className="w-40 h-12 bg-white/5 rounded-xl animate-pulse" />
                  ) : account ? (
                    <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-white/30">
                        <span className="text-sm font-bold text-black">
                          {account.displayName?.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-sm font-semibold text-white truncate max-w-[120px]">
                          {account.displayName}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={openConnectModal}
                      className="btn-primary"
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
