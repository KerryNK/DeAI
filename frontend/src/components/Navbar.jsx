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
    <header className="sticky top-0 z-50 bg-inst-bg border-b border-inst-border">
      {/* Institutional top bar – market data */}
      <div className="bg-inst-bg-elevated border-b border-inst-border-subtle px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8 text-sm">
            {priceData && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-inst-text-muted font-medium">TAO</span>
                  <span className="text-inst-text font-semibold tabular-nums">${priceData.price?.toFixed(2) || 'N/A'}</span>
                  <span className={`text-xs font-medium tabular-nums ${priceData.change24h >= 0 ? 'text-inst-success' : 'text-inst-error'}`}>
                    {priceData.change24h >= 0 ? '▲' : '▼'} {Math.abs(priceData.change24h || 0).toFixed(2)}%
                  </span>
                </div>
                {priceData.volume24h && (
                  <div className="flex items-center gap-2">
                    <span className="text-inst-text-muted">24h Vol</span>
                    <span className="text-inst-text tabular-nums">${(priceData.volume24h / 1000000).toFixed(2)}M</span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="text-inst-text-faint text-xs font-medium tracking-wide uppercase">
            Bittensor Network
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="px-6 py-4 bg-inst-bg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-inst-bg-card border border-inst-border flex items-center justify-center group-hover:border-inst-accent/50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-inst-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="font-serif text-xl font-normal text-inst-text tracking-tight">DeAI</span>
            <span className="font-sans text-xl font-semibold text-inst-accent">Nexus</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-inst-text-muted hover:text-inst-text rounded-lg hover:bg-inst-bg-card transition">
              Home
            </Link>
            <Link to="/statistics" className="px-4 py-2 text-sm font-medium text-inst-text-muted hover:text-inst-text rounded-lg hover:bg-inst-bg-card transition">
              Research
            </Link>
            <Link to="/strategies" className="px-4 py-2 text-sm font-medium text-inst-text-muted hover:text-inst-text rounded-lg hover:bg-inst-bg-card transition">
              Strategies
            </Link>
            <Link to="/app/dashboard" className="px-4 py-2 text-sm font-medium text-inst-text-muted hover:text-inst-text rounded-lg hover:bg-inst-bg-card transition">
              Dashboard
            </Link>
            <Link to="/app/portfolio" className="px-4 py-2 text-sm font-medium text-inst-text-muted hover:text-inst-text rounded-lg hover:bg-inst-bg-card transition">
              Portfolio
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-inst-text-muted hover:text-inst-text rounded-lg hover:bg-inst-bg-card border border-transparent hover:border-inst-border transition"
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

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-inst-bg-card rounded-lg border border-inst-border text-sm hover:border-inst-border-subtle transition"
                >
                  <span className="w-2 h-2 bg-inst-success rounded-full ring-2 ring-inst-bg"></span>
                  <span className="text-inst-text-muted truncate max-w-[120px] font-medium">
                    {user.username || user.email}
                  </span>
                  <svg className="w-4 h-4 text-inst-text-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-inst-bg-card border border-inst-border rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-inst-border">
                      <p className="text-sm font-semibold text-inst-text">{user.username}</p>
                      <p className="text-xs text-inst-text-muted truncate">{user.email}</p>
                    </div>
                    <Link to="/app/profile" className="block px-4 py-2.5 text-sm text-inst-text-muted hover:text-inst-text hover:bg-inst-bg-elevated transition" onClick={() => setShowUserMenu(false)}>
                      Profile
                    </Link>
                    <Link to="/app/settings" className="block px-4 py-2.5 text-sm text-inst-text-muted hover:text-inst-text hover:bg-inst-bg-elevated transition" onClick={() => setShowUserMenu(false)}>
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-inst-error hover:bg-inst-bg-elevated transition">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 bg-inst-accent hover:bg-sky-500 text-white rounded-lg text-sm font-semibold transition border border-transparent"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
