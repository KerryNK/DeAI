import { Link } from 'react-router-dom';
import { useTheme } from '../lib/themeContext';
import { useAuth } from '../lib/authContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Fetch live TAO price
  const { data: priceData } = useQuery({
    queryKey: ['taoPrice'],
    queryFn: () => apiClient.getTaoPrice(),
    staleTime: 15000,
    refetchInterval: 30000,
    retry: 1,
  });

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-black border-b border-gray-900">
      {/* Live Price Ticker */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-b border-gray-800/50 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            {priceData && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">TAO:</span>
                  <span className="text-white font-semibold">${priceData.price?.toFixed(2) || 'N/A'}</span>
                  <span className={priceData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {priceData.change24h >= 0 ? '▲' : '▼'} {Math.abs(priceData.change24h || 0).toFixed(2)}%
                  </span>
                </div>
                {priceData.volume24h && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">VOL:</span>
                    <span className="text-gray-300">{(priceData.volume24h / 1000000).toFixed(2)}M</span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="text-gray-500">
            Network: Bittensor
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition">
            DeAI
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-400 hover:text-white transition text-sm">Home</Link>
            <Link to="/statistics" className="text-gray-400 hover:text-white transition text-sm">Statistics</Link>
            <Link to="/strategies" className="text-gray-400 hover:text-white transition text-sm">Strategies</Link>
            <Link to="/app/dashboard" className="text-gray-400 hover:text-white transition text-sm">Dashboard</Link>
            <Link to="/app/portfolio" className="text-gray-400 hover:text-white transition text-sm">Portfolio</Link>
          </div>

          {/* Right Side: Theme Toggle + User Account */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* User Account / Sign In */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 text-sm hover:bg-gray-800 transition cursor-pointer"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-400 truncate max-w-[120px]">
                    {user.username || user.email}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <p className="text-sm text-white font-medium">{user.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/app/profile"
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/app/settings"
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
