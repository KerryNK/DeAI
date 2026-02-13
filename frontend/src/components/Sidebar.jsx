import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/app/scoring', label: 'Scoring Metrics', icon: '🎯' },
  { to: '/app/portfolio', label: 'Portfolio', icon: '💼' },
  { to: '/app/wallet', label: 'Wallet', icon: '👛' },
  { to: '/app/history', label: 'History', icon: '📜' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-[6rem] h-[calc(100vh-6rem)] w-72 bg-black border-r border-gray-900 z-40">
      <nav className="p-8 space-y-3">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-4 p-5 rounded transition group border ${
                active
                  ? 'bg-gray-900 border-gray-700 text-white font-semibold'
                  : 'text-gray-400 hover:text-white border-transparent hover:border-gray-800 hover:bg-gray-900'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
