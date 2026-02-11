export default function Statistics() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Network Statistics</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-sm">Total Subnets</div>
                        <div className="text-3xl font-bold mt-2">128</div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-sm">Total MCap</div>
                        <div className="text-3xl font-bold mt-2">$2.03B</div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-sm">Daily Emissions</div>
                        <div className="text-3xl font-bold mt-2">3,600τ</div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="text-slate-400 text-sm">TAO Price</div>
                        <div className="text-3xl font-bold mt-2">$191.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
