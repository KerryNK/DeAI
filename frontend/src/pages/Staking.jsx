import { useState } from 'react';

export default function Staking() {
    const [connectedAccount, setConnectedAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        setLoading(true);
        setError(null);

        // Placeholder for Polkadot wallet connection
        // Will be implemented with @polkadot/extension-dapp
        setTimeout(() => {
            setError('Install Talisman, Nova Wallet, or Subwallet to connect');
            setLoading(false);
        }, 500);
    };

    const platformStats = [
        { label: "Total Value Locked", value: "$2,048,466", change: "+51.43% (7d)" },
        { label: "Participants", value: "2,232", change: null },
        { label: "Highest Yield", value: "183.88%", change: null },
    ];

    const yieldOptions = [
        {
            name: "High Yield Variant",
            apy: "183.88",
            tag: "High",
            desc: "Higher yield potential through optimized exposure.",
        },
        {
            name: "Stable Variant",
            apy: "7.96",
            tag: "Stable",
            desc: "Principal preservation. Returns auto-compounded.",
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased leading-relaxed">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-20">

                {/* Top heading */}
                <header className="text-center mb-20">
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight">
                        Staking Dashboard
                    </h1>
                    <p className="mt-4 text-2xl md:text-3xl text-gray-400">
                        Enterprise-grade delegation
                    </p>
                </header>

                {/* Connect prompt */}
                <section className="text-center mb-24 py-12 border-t border-b border-gray-800">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Wallet</h2>

                    {connectedAccount ? (
                        <div className="space-y-4">
                            <p className="text-2xl text-gray-200">
                                Connected: {connectedAccount.slice(0, 8)}...{connectedAccount.slice(-6)}
                            </p>
                            <button
                                onClick={() => setConnectedAccount(null)}
                                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg transition-colors"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
                                Connect to access automated options with yields up to
                                <br className="hidden sm:block" />
                                <span className="text-3xl font-black text-white">183.88%+</span>
                            </p>
                            <button
                                onClick={connectWallet}
                                disabled={loading}
                                className="px-10 py-5 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-medium transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Connecting...' : 'Connect Wallet'}
                            </button>
                            {error && (
                                <p className="mt-6 text-lg text-gray-400">{error}</p>
                            )}
                            <p className="mt-6 text-sm text-gray-500">
                                Supports Talisman, Nova Wallet, Subwallet, Crucible
                            </p>
                        </>
                    )}
                </section>

                {/* Platform stats */}
                <section className="mb-24">
                    <h2 className="text-4xl font-bold mb-10 text-center">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 text-center">
                        {platformStats.map((stat) => (
                            <div key={stat.label} className="space-y-3">
                                <div className="text-5xl md:text-6xl font-black tracking-tight text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xl text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                                {stat.change && (
                                    <div className="text-2xl font-bold text-gray-200">
                                        {stat.change}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Yield options */}
                <section className="mb-24">
                    <h2 className="text-4xl font-bold mb-10 text-center">Yield Options</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        {yieldOptions.map((opt) => (
                            <div
                                key={opt.name}
                                className="border border-gray-800 rounded-xl p-8 space-y-6 hover:border-gray-600 transition-colors"
                            >
                                <div>
                                    <div className="text-3xl font-bold">{opt.name}</div>
                                    <div className="text-lg text-gray-400 mt-1">{opt.tag}</div>
                                </div>
                                <div className="text-6xl md:text-7xl font-black text-white">
                                    {opt.apy}%
                                </div>
                                <p className="text-gray-300 text-lg">{opt.desc}</p>
                                <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded text-base font-medium transition-colors">
                                    Start Staking
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section className="mb-24 border-t border-gray-800 pt-20">
                    <h2 className="text-4xl font-bold mb-12">How it works</h2>

                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="text-6xl font-bold text-gray-800 leading-none">1</div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2">Connect Wallet</h3>
                                <p className="text-gray-400 text-lg">
                                    Connect your Polkadot-compatible wallet. Supports Talisman, Nova Wallet, Subwallet, and more.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="text-6xl font-bold text-gray-800 leading-none">2</div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2">Choose Strategy</h3>
                                <p className="text-gray-400 text-lg">
                                    Select from curated staking strategies or create a custom allocation.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="text-6xl font-bold text-gray-800 leading-none">3</div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2">Delegate Tokens</h3>
                                <p className="text-gray-400 text-lg">
                                    Approve the transaction and delegate. You remain in full control.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="text-6xl font-bold text-gray-800 leading-none">4</div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2">Earn Rewards</h3>
                                <p className="text-gray-400 text-lg">
                                    Watch rewards accumulate. Claim anytime or auto-compound for maximum yield.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security */}
                <section className="mb-24 border-t border-gray-800 pt-20">
                    <h2 className="text-4xl font-bold mb-12">Security & Trust</h2>

                    <div className="space-y-8 text-lg text-gray-400">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Non-custodial</h3>
                            <p>You maintain full control of your private keys. We never hold your assets.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Audited Smart Contracts</h3>
                            <p>All contracts are audited by leading security firms and open source.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Automated Rebalancing</h3>
                            <p>Strategies automatically rebalance to maintain optimal performance and risk profiles.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">24/7 Monitoring</h3>
                            <p>Real-time monitoring and alerts for all validator performance and network health.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 text-center border-t border-gray-800">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to start earning?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Connect your wallet and start staking in under 2 minutes.
                    </p>
                    <button
                        onClick={connectWallet}
                        disabled={loading}
                        className="px-10 py-5 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                </section>

            </div>
        </div>
    );
}
