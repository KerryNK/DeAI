export default function Portfolio() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Portfolio Tracker</h1>
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
                    <p className="text-slate-300 mb-4">Connect your wallet to track your subnet holdings</p>
                    <button className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-lg font-semibold">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}
