export default function History() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Historical Data</h1>
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
                    <p className="text-slate-300 mb-6">
                        Access historical performance data, price charts, and metric trends for all subnets.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900 p-4 rounded">
                            <div className="text-slate-400 text-sm mb-2">Data Available</div>
                            <div className="text-lg font-semibold">Last 90 Days</div>
                        </div>
                        <div className="bg-slate-900 p-4 rounded">
                            <div className="text-slate-400 text-sm mb-2">Update Frequency</div>
                            <div className="text-lg font-semibold">Real-time</div>
                        </div>
                        <div className="bg-slate-900 p-4 rounded">
                            <div className="text-slate-400 text-sm mb-2">Metrics Tracked</div>
                            <div className="text-lg font-semibold">50+</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
