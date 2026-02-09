import { useState } from 'react';

export default function Navbar({ theme, onThemeChange }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className={`${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-50`}>
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 100 100" fill="none" className="w-6 h-6 text-white">
                                <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="5" />
                                <circle cx="50" cy="50" r="16" fill="white" />
                                <line x1="50" y1="8" x2="50" y2="34" stroke="white" strokeWidth="5" strokeLinecap="round" />
                                <line x1="50" y1="66" x2="50" y2="92" stroke="white" strokeWidth="5" strokeLinecap="round" />
                                <line x1="8" y1="50" x2="34" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round" />
                                <line x1="66" y1="50" x2="92" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                DeAI <span className="text-violet-500">Nexus</span>
                            </h1>
                            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                Bittensor Intelligence
                            </p>
                        </div>
                    </div>

                    {/* Center - Status */}
                    <div className={`hidden md:flex items-center space-x-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className="flex items-center space-x-1 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                    </div>

                    {/* Right - Wallet + Theme */}
                    <div className="flex items-center space-x-4">
                        {/* Wallet Connect Button */}
                        <button className="hidden sm:block px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold transition">
                            Connect Wallet
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={onThemeChange}
                            className={`p-2 rounded-lg transition ${
                                theme === 'dark'
                                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`md:hidden p-2 rounded-lg ${
                                theme === 'dark'
                                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
