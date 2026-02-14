import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Scoring from './pages/Scoring';
import Portfolio from './pages/Portfolio';
import History from './pages/History';
import Wallet from './pages/Wallet';
import Staking from './pages/Staking';
import Strategies from './pages/Strategies';
import ConnectWallet from './pages/ConnectWallet';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { WalletProvider } from './lib/walletContext';
import { ThemeProvider } from './lib/themeContext';
import { AuthProvider } from './lib/authContext';

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/strategies" element={<Strategies />} />

            {/* Protected Routes - Require Login */}
            <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/app/scoring" element={<ProtectedRoute><Scoring /></ProtectedRoute>} />
            <Route path="/app/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/app/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="/app/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
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
            <ThemeProvider>
              <AuthProvider>
                <WalletProvider>
                  <AppContent />
                </WalletProvider>
              </AuthProvider>
            </ThemeProvider>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

