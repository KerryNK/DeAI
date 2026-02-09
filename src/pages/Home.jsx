export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">DeAI Nexus</h1>
                <p className="text-xl text-slate-300 mb-8">Bittensor Intelligence Platform</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                        <p className="text-slate-300 mb-4">Explore comprehensive analytics on Bittensor subnets, market metrics, and scoring analysis.</p>
                        <button className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-lg font-semibold">Go to Dashboard</button>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
                        <p className="text-slate-300 mb-4">Real-time network statistics and performance metrics for the Bittensor ecosystem.</p>
                        <button className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-semibold">View Stats</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
