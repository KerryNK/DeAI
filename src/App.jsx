import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Scoring from './pages/Scoring';
import Portfolio from './pages/Portfolio';
import History from './pages/History';

// Setup wagmi
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className={`transition-all duration-300 ${isAppRoute ? 'lg:ml-64' : ''}`}>
        {/* Sidebar for app routes */}
        {isAppRoute && <Sidebar />}
        
        {/* Page content */}
        <div className="p-8 max-w-7xl mx-auto lg:pl-4 lg:pr-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/scoring" element={<Scoring />} />
            <Route path="/app/portfolio" element={<Portfolio />} />
            <Route path="/app/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <AppContent />
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

