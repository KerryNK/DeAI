import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/app/scoring', label: 'Scoring Metrics', icon: '🎯' },
  { to: '/app/portfolio', label: 'Portfolio', icon: '💼' },
  { to: '/app/wallet', label: 'Wallet', icon: '👛' },
  { to: '/app/history', label: 'History', icon: '📜' },
];

const resourceItems = [
  { to: '/statistics', label: 'Statistics', icon: '📈' },
  { to: '/strategies', label: 'Strategies', icon: '⚡' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="fixed left-0 top-[8.5rem] h-[calc(100vh-8.5rem)] w-64 bg-black border-r border-gray-900 z-40 overflow-y-auto">
      <nav className="p-6 space-y-6">
        {/* Connection Status */}
        {isAuthenticated && user && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Logged In</span>
            </div>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        )}

        {/* Main Navigation */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition group ${active
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/30 text-white font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-wide px-4 mb-3">Resources</h3>
          <div className="space-y-1">
            {resourceItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition group ${active
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
