import { useState } from 'react'
import { usePolkadotWallet } from '../hooks/usePolkadotWallet'
import YieldCard from '../components/YieldCard'

export default function Home() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const { connectedAccount, loading, error, connectWallet, disconnectWallet } = usePolkadotWallet()

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* Section 1: Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4" style={{ lineHeight: '1.15' }}>
            Staking Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10">
            Enterprise staking for Bittensor
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setWalletModalOpen(true)}
              className="py-6 px-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg rounded-xl transition"
            >
              Start Earning
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-300 hover:text-white text-lg transition"
            >
              Why hold dTAO?
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Wallet Prompt Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ lineHeight: '1.15' }}>Your Wallet</h3>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Start Earning Passively. Connect to access automated strategies with up to{' '}
            <span className="text-cyan-400 font-bold">183.88%+ APY</span>
          </p>
          <button
            onClick={() => setWalletModalOpen(true)}
            className="py-6 px-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg rounded-xl transition"
          >
            Connect Wallet
          </button>
        </div>
      </section>

      {/* Section 3: Platform Stats */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ lineHeight: '1.15' }}>Platform Stats</h3>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-black mb-2" style={{ lineHeight: '1.15' }}>
              13,138.42 τ ≈ $2,115,018{' '}
              <span className="text-gray-400 text-2xl font-normal">(+49.41% 7d)</span>
            </div>
            <div className="text-gray-400 text-base">Assets Under Management</div>
          </div>
        </div>
      </section>

      {/* Section 4: Yield Opportunities */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ lineHeight: '1.15' }}>Yield Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-900 rounded-lg p-8 text-center">
              <div className="text-2xl md:text-3xl font-bold mb-4">High Yield</div>
              <div className="text-6xl md:text-7xl font-black text-cyan-400 mb-2" style={{ lineHeight: '1.15' }}>183.88%+</div>
              <div className="text-gray-400 mb-1 text-sm">APY</div>
              <p className="text-gray-400 mt-6 text-base">Higher yield potential through optimized subnet exposure.</p>
            </div>
            <div className="border border-gray-900 rounded-lg p-8 text-center">
              <div className="text-2xl md:text-3xl font-bold mb-4">Stable</div>
              <div className="text-6xl md:text-7xl font-black text-cyan-400 mb-2" style={{ lineHeight: '1.15' }}>7.96%</div>
              <div className="text-gray-400 mb-1 text-sm">APY</div>
              <p className="text-gray-400 mt-6 text-base">Keep your TAO principle. Dividends auto-staked into subnets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section id="how-it-works" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ lineHeight: '1.15' }}>How it works</h2>
          <div className="space-y-10">
            {[
              { num: '1', title: 'Connect wallet', desc: 'Link your Polkadot wallet (Talisman, Nova Wallet, Subwallet) — non-custodial and fully secure.' },
              { num: '2', title: 'Choose a strategy', desc: 'Pick a curated subnet portfolio matching your risk tolerance and yield preferences.' },
              { num: '3', title: 'Delegate', desc: 'Stake once. All delegation happens on-chain with full transparency and audit trails.' },
              { num: '4', title: 'Earn Rewards', desc: 'Sit back. We monitor 24/7, rebalance daily, and auto-compound your returns.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl font-black text-gray-900 min-w-[60px]">{step.num}</div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ lineHeight: '1.15' }}>{step.title}</h3>
                  <p className="text-gray-400 text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-300 text-base mb-3">
              Stake your TAO once → routes to highest-yield subnets, monitors 24/7, auto-rebalances.
            </p>
            <div className="text-gray-300 text-sm">
              Learn more:{' '}
              <a href="#" className="hover:text-white transition">Docs</a>
              {' | '}
              <a href="#" className="hover:text-white transition">Research</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Platform Security */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ lineHeight: '1.15' }}>Platform Security</h2>
          <p className="text-xl text-gray-400 text-center mb-10">Enterprise-grade protection</p>
          <div className="space-y-6 max-w-3xl mx-auto mb-10">
            <div>
              <h4 className="font-bold text-base mb-1">Your funds never leave your wallet</h4>
              <p className="text-gray-300 text-sm">Interact through proxies only when permitted.</p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">Non-custodial security</h4>
              <p className="text-gray-300 text-sm">Full control, withdraw anytime — no lockups.</p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-1">Automated Strategies</h4>
              <p className="text-gray-300 text-sm">Choose profile for max APY, zero micromanaging.</p>
            </div>
          </div>
          <div className="text-center">
            <button className="py-6 px-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg rounded-xl transition">
              Explore Strategies
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: Self Service */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Prefer full control? Delegate, track, swap, harvest yourself. Free, transparent.
          </p>
          <button className="py-6 px-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg rounded-xl transition">
            Go to Staking
          </button>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ lineHeight: '1.15' }}>Start Earning Passively</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Connect your wallet and choose a strategy. We handle the rest — monitoring, rebalancing, and compounding your rewards 24/7.
          </p>
          <button
            onClick={() => setWalletModalOpen(true)}
            className="py-6 px-16 md:px-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xl rounded-xl transition"
          >
            Delegate Now
          </button>
        </div>
      </section>

      {/* Wallet Modal */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-md bg-black border border-gray-900 rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-bold">Connect Wallet</h4>
              <button
                onClick={() => setWalletModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-400 mb-6 text-sm">Select a wallet to connect. Supported wallets: Talisman, Nova Wallet, Subwallet.</p>
            <div className="flex flex-col gap-3">
              {['Talisman', 'Nova Wallet', 'Subwallet'].map((w) => (
                <button
                  key={w}
                  onClick={async () => {
                    await connectWallet()
                    setWalletModalOpen(false)
                  }}
                  className="w-full text-left px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg font-medium transition text-sm"
                >
                  {w}
                </button>
              ))}
            </div>
            {loading && <div className="mt-4 text-sm text-gray-400 text-center">Connecting…</div>}
            {error && <div className="mt-4 text-sm text-red-400 text-center">{error}</div>}
            {connectedAccount && <div className="mt-4 text-sm text-green-400 text-center">✓ Connected: {connectedAccount}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
