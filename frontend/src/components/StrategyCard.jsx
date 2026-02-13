export default function StrategyCard({ strategy }) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded p-6 space-y-4 hover:border-gray-700 transition">
            {/* Strategy name and description */}
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                    {strategy.name}
                </h3>
                <p className="text-gray-500 text-sm">{strategy.description}</p>
            </div>

            {/* APY - main metric */}
            <div className="text-4xl font-bold tracking-tight text-white">
                {strategy.apy}%
            </div>

            {/* Features list */}
            <ul className="text-gray-400 text-sm space-y-1">
                {strategy.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                ))}
            </ul>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
                <button className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm font-medium transition">
                    Delegate
                </button>
                <button className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded text-sm transition">
                    Details
                </button>
            </div>
        </div>
    );
}
