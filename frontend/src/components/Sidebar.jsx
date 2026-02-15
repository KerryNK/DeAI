import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: 'Dashboard' },
  { to: '/app/scoring', label: 'Scoring Metrics', icon: 'Scoring' },
  { to: '/app/portfolio', label: 'Portfolio', icon: 'Portfolio' },
  { to: '/app/wallet', label: 'Wallet', icon: 'Wallet' },
  { to: '/app/history', label: 'History', icon: 'History' },
];

const resourceItems = [
  { to: '/statistics', label: 'Research', icon: 'Chart' },
  { to: '/strategies', label: 'Strategies', icon: 'Strategy' },
];

const Icon = ({ name, className }) => {
  const c = className || 'w-5 h-5';
  const stroke = 'currentColor';
  const strokeWidth = 2;
  const strokeLinecap = 'round';
  const strokeLinejoin = 'round';
  switch (name) {
    case 'Dashboard':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
          <path d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          <path d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case 'Scoring':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'Portfolio':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'Wallet':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case 'History':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Chart':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'Strategy':
      return (
        <svg className={c} fill="none" stroke={stroke} viewBox="0 0 24 24" strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin}>
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Sidebar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="fixed left-0 top-[8.5rem] h-[calc(100vh-8.5rem)] w-64 bg-inst-bg-elevated border-r border-inst-border z-40 overflow-y-auto">
      <nav className="p-5 space-y-6">
        {isAuthenticated && user && (
          <div className="bg-inst-bg-card border border-inst-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-inst-success rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-inst-text-muted uppercase tracking-wider">Connected</span>
            </div>
            <p className="text-xs text-inst-text-faint truncate">{user.email}</p>
          </div>
        )}

        <div className="space-y-0.5">
          <p className="px-3 mb-2 text-xs font-semibold text-inst-text-faint uppercase tracking-wider">App</p>
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-inst-accent/10 text-inst-accent border border-inst-accent/20'
                    : 'text-inst-text-muted hover:text-inst-text hover:bg-inst-bg-card border border-transparent'
                }`}
              >
                <Icon name={item.icon} className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-2 border-t border-inst-border">
          <p className="px-3 mb-2 text-xs font-semibold text-inst-text-faint uppercase tracking-wider">Resources</p>
          <div className="space-y-0.5">
            {resourceItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    active ? 'bg-inst-bg-card text-inst-text border border-inst-border' : 'text-inst-text-muted hover:text-inst-text hover:bg-inst-bg-card border border-transparent'
                  }`}
                >
                  <Icon name={item.icon} className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
