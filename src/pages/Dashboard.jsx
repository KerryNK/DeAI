import DeAINexusTerminal from '../components/DeAINexusTerminal';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export default function Dashboard() {
    // Fetch live TAO price
    const { data: priceData, isLoading: priceLoading } = useQuery({
        queryKey: ['taoPrice'],
        queryFn: () => apiClient.getTaoPrice(),
        staleTime: 15000, // 15 seconds for live price
        refetchInterval: 30000, // Refresh every 30s
        retry: 1,
    });

    // Fetch dashboard data
    const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => apiClient.getDashboard(),
        staleTime: 30000,
        refetchInterval: 60000, // Refresh every 60s
        retry: 1,
    });

    return (
        <div>
            {/* Live TAO Price Banner */}
            {priceData && (
                <div className="bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30 rounded-lg p-4 mb-6 mx-8 mt-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/60 text-sm">TAO / USD</p>
                            <p className="text-3xl font-bold text-white">
                                ${priceData.price?.toFixed(2) || 'N/A'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={priceData.change24h >= 0 ? 'text-green-400 text-xl font-bold' : 'text-red-400 text-xl font-bold'}>
                                {priceData.change24h >= 0 ? '📈 +' : '📉 '}{priceData.change24h?.toFixed(2)}%
                            </p>
                            <p className="text-white/60 text-sm">24h Change</p>
                        </div>
                        {priceLoading && <span className="text-blue-400 text-sm">Updating...</span>}
                    </div>
                </div>
            )}

            {/* Dashboard Analytics */}
            <DeAINexusTerminal />
        </div>
    );
}
