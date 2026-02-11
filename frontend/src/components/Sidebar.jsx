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
    <aside className="sidebar fixed left-0 top-[6rem] h-[calc(100vh-6rem)] w-72 bg-black/95 backdrop-blur-xl border-r border-white/10 z-40">
      <nav className="p-8 space-y-3">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-4 p-5 rounded-2xl transition-all duration-300 group border ${
                active
                  ? 'nav-link active bg-white/5 border-white/50 shadow-xl text-white'
                  : 'text-white/70 hover:text-white border-white/10 hover:border-white/40 hover:bg-white/5'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-bold text-lg">{item.label}</span>
              {active && <div className="ml-auto w-2 h-2 bg-white rounded-full" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
