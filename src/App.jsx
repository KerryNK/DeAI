import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Scoring from './pages/Scoring';
import Portfolio from './pages/Portfolio';
import History from './pages/History';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [theme, setTheme] = useState('dark');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'scoring':
                return <Scoring />;
            case 'portfolio':
                return <Portfolio />;
            case 'history':
                return <History />;
            case 'statistics':
                return <Statistics />;
            case 'home':
                return <Home />;
            default:
                return <Dashboard />;
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={theme}>
            <div
                className={`min-h-screen flex flex-col ${
                    theme === 'dark'
                        ? 'bg-slate-950 text-white'
                        : 'bg-white text-slate-900'
                }`}
            >
                {/* Navbar */}
                <Navbar theme={theme} onThemeChange={toggleTheme} />

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar
                        theme={theme}
                        currentPage={currentPage}
                        onPageChange={(page) => {
                            setCurrentPage(page);
                            setSidebarOpen(false);
                        }}
                        isOpen={sidebarOpen}
                    />

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto">
                        {renderPage()}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;

