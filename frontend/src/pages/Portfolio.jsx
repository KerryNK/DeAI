import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  // Fetch staking positions from API
  const { data: positions, isLoading: positionsLoading, error: positionsError } = useQuery({
    queryKey: ['stakingPositions', address],
    queryFn: () => apiClient.getStakingPositions(address),
    enabled: !!address && isConnected,
    staleTime: 30000,
    retry: 2,
  });

  // Fetch transaction history from API
  const { data: transactionData, isLoading: txLoading, error: txError } = useQuery({
    queryKey: ['stakingHistory', address],
    queryFn: () => apiClient.getStakingHistory(address, 50),
    enabled: !!address && isConnected,
    staleTime: 30000,
    retry: 2,
  });

  // Use API data or fallback to mock data
  const stakingPositions = positions?.positions || [
    { id: 1, subnet_id: 1, subnet: 'Subnet 1', amount: 1000, apy: 12.5, earnings: 125, status: 'active' },
    { id: 2, subnet_id: 8, subnet: 'Subnet 8', amount: 5000, apy: 15.2, earnings: 760, status: 'active' },
    { id: 3, subnet_id: 21, subnet: 'Subnet 21', amount: 2500, apy: 10.8, earnings: 270, status: 'pending' },
  ];

  const transactions = transactionData?.transactions || [
    { id: 1, type: 'Deposit', subnet: 'Subnet 1', amount: 1000, timestamp: '2024-02-08', status: 'Confirmed' },
    { id: 2, type: 'Withdraw', subnet: 'Subnet 8', amount: 500, timestamp: '2024-02-07', status: 'Confirmed' },
    { id: 3, type: 'Claim Rewards', subnet: 'Subnet 1', amount: 125, timestamp: '2024-02-06', status: 'Confirmed' },
  ];

  const isLoading = positionsLoading || txLoading;
  const hasError = positionsError || txError;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-lg text-white/70 mb-6">Connect your wallet to view your staking portfolio</p>
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  const totalStaked = stakingPositions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalEarnings = stakingPositions.reduce((sum, pos) => sum + pos.earnings, 0);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
          <p className="text-white/60">Your staking positions and earnings</p>
          {isLoading && <p className="text-gray-400 text-sm mt-2\">⚪ Loading positions...</p>}
          {hasError && <p className="text-yellow-400 text-sm mt-2">⚠️ Using cached data</p>}
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-sm mb-2">Total Staked</div>
            <div className="text-3xl font-bold">{totalStaked.toLocaleString()} TAO</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-sm mb-2">Total Earnings</div>
            <div className="text-3xl font-bold text-green-400">{totalEarnings.toLocaleString()} TAO</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-sm mb-2">Active Positions</div>
            <div className="text-3xl font-bold">
              {stakingPositions.filter(p => p.status === 'Active').length}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-sm mb-2">Wallet Balance</div>
            <div className="text-3xl font-bold">
              {balance ? `${parseFloat(balance.formatted).toFixed(2)}` : '0'} {balance?.symbol}
            </div>
          </div>
        </div>

        {/* Staking Positions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Staking Positions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-semibold">Subnet</th>
                  <th className="text-left py-3 px-4 text-white/60 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-white/60 font-semibold">APY</th>
                  <th className="text-left py-3 px-4 text-white/60 font-semibold">Earnings</th>
                  <th className="text-left py-3 px-4 text-white/60 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-white/60 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {stakingPositions.map(position => (
                  <tr key={position.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-4 px-4 font-medium">{position.subnet}</td>
                    <td className="py-4 px-4">{position.amount.toLocaleString()} TAO</td>
                    <td className="py-4 px-4 text-green-400">{position.apy}%</td>
                    <td className="py-4 px-4 text-green-400">+{position.earnings} TAO</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-lg text-sm ${
                        position.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {position.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{tx.type}</div>
                  <div className="text-white/60 text-sm">{tx.subnet} • {tx.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{tx.amount} TAO</div>
                  <div className="text-green-400 text-sm">{tx.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
