export default function Scoring() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Scoring Methodology</h1>
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Composite Score Formula</h2>
                            <p className="text-slate-300 mb-4">
                                Our scoring system combines five key metrics to provide a comprehensive assessment of subnet quality and investment potential.
                            </p>
                            <div className="bg-slate-900 p-4 rounded font-mono text-sm">
                                <div>Score = (20% × F) + (25% × P) + (30% × E) + (20% × D) + (5% × C)</div>
                                <div className="mt-4 text-slate-400">
                                    <div>F = Fundamentals (Revenue Coverage)</div>
                                    <div>P = Performance (Validators, Miners, Utilization)</div>
                                    <div>E = Economics (Emissions, APY, Revenue Coverage)</div>
                                    <div>D = Development (Commits, Network Activity)</div>
                                    <div>C = Credibility (Validator Count)</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Score Ranges</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-green-900 p-4 rounded">
                                    <div className="text-sm text-slate-400">Excellent</div>
                                    <div className="text-xl font-bold">70+</div>
                                </div>
                                <div className="bg-gray-800 p-4 rounded">
                                    <div className="text-sm text-slate-400">Good</div>
                                    <div className="text-xl font-bold">55-69</div>
                                </div>
                                <div className="bg-amber-900 p-4 rounded">
                                    <div className="text-sm text-slate-400">Fair</div>
                                    <div className="text-xl font-bold">40-54</div>
                                </div>
                                <div className="bg-red-900 p-4 rounded">
                                    <div className="text-sm text-slate-400">Poor</div>
                                    <div className="text-xl font-bold">&lt;40</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
