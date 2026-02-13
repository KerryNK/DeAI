import StrategyCard from '../components/StrategyCard';
import { platformStats, groupedStrategies } from '../data/strategies';

export default function Strategies() {
    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">

                {/* Platform Stats - massive numbers for visibility */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-center">
                    <div className="space-y-2">
                        <div className="text-5xl md:text-6xl font-black tracking-tight">
                            {platformStats.totalAUM}
                        </div>
                        <div className="text-lg text-gray-400 font-medium">Total AUM</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-5xl md:text-6xl font-black tracking-tight">
                            {platformStats.aumGrowth}
                        </div>
                        <div className="text-lg text-gray-400 font-medium">7d Growth</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-5xl md:text-6xl font-black tracking-tight">
                            {platformStats.totalNominators}
                        </div>
                        <div className="text-lg text-gray-400 font-medium">Nominators</div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-5xl md:text-6xl font-black tracking-tight">
                            {platformStats.topAPY}
                        </div>
                        <div className="text-lg text-gray-400 font-medium">Top APY</div>
                    </div>
                </div>

                {/* Header */}
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                    Strategies
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl">
                    Automated non-custodial yield optimization. Choose a profile and delegate.
                </p>

                {/* Strategies by Category */}
                {Object.entries(groupedStrategies).map(([category, strategies]) => (
                    <div key={category} className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b border-gray-800 pb-4">
                            {category}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {strategies.map((strategy, idx) => (
                                <StrategyCard key={idx} strategy={strategy} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
