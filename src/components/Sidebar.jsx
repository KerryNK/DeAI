import { useState } from 'react';

export default function Sidebar({ theme, currentPage, onPageChange, isOpen }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'scoring', label: 'Scoring', icon: '🎯' },
        { id: 'portfolio', label: 'Portfolio', icon: '💼' },
        { id: 'history', label: 'History', icon: '📈' },
        { id: 'statistics', label: 'Statistics', icon: '📉' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
                    onClick={() => onPageChange(null)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:relative left-0 top-16 md:top-0 w-64 h-[calc(100vh-4rem)] md:h-full ${
                    theme === 'dark'
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                } border-r transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:translate-x-0 z-40`}
            >
                <div className="p-6 space-y-2">
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                        Navigation
                    </div>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onPageChange(item.id)}
                            className={`w-full px-4 py-3 rounded-lg transition text-left flex items-center space-x-3 font-medium ${
                                currentPage === item.id
                                    ? theme === 'dark'
                                        ? 'bg-violet-600 text-white'
                                        : 'bg-violet-100 text-violet-900'
                                    : theme === 'dark'
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div
                    className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
                        theme === 'dark'
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-slate-100 border-slate-200'
                    }`}
                >
                    <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        <div className="font-semibold mb-1">DeAI Nexus v3</div>
                        <div>Powered by Bittensor</div>
                    </div>
                </div>
            </aside>
        </>
    );
}
