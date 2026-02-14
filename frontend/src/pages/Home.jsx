import { useState } from 'react'
import { usePolkadotWallet } from '../hooks/usePolkadotWallet'

export default function Home() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const { connectedAccount, loading, error, connectWallet, disconnectWallet } = usePolkadotWallet()

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans antialiased">
      {/* Section: Your Wallet (first) */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-white text-3xl md:text-4xl tracking-tight mb-4" style={{ lineHeight: '1.1' }}>Your Wallet</h3>
          <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">Start Earning Passively. Connect to access automated strategies.</p>
          <button
            onClick={() => setWalletModalOpen(true)}
            className="rounded-xl py-6 px-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-lg"
          >
            {connectedAccount ? `Connected: ${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </section>

      {/* Section: Platform Stats (single line) */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white text-6xl tracking-tight mb-3" style={{ lineHeight: '1.1' }}>
            13,138.42 τ ≈ $2,115,018 (+49.41% 7d)
          </div>
          <div className="text-gray-400 text-sm">Assets Under Management</div>
        </div>
      </section>

      {/* Section: Yield Opportunities */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl tracking-tight text-center mb-12">Yield Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-900 rounded-xl p-8 md:p-10 text-center">
              <div className="text-gray-400 text-sm mb-4">High Yield</div>
              <div className="text-cyan-400 text-6xl md:text-7xl font-black mb-2 leading-[1.1] tracking-tight text-center">183.88%+</div>
              <div className="text-gray-400 text-sm mb-6">APY</div>
              <p className="text-gray-300 text-base">Higher yield potential through optimized subnet exposure.</p>
            </div>
            <div className="border border-gray-900 rounded-xl p-8 md:p-10 text-center">
              <div className="text-gray-400 text-sm mb-4">Stable</div>
              <div className="text-cyan-400 text-6xl md:text-7xl font-black mb-2 leading-[1.1] tracking-tight text-center">7.96%</div>
              <div className="text-gray-400 text-sm mb-6">APY</div>
              <p className="text-gray-300 text-base">Keep your TAO principal. Dividends auto-staked into subnets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How it works */}
      <section id="how-it-works" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl tracking-tight text-center mb-12">How it works</h2>
          <div className="space-y-10">
            {[
              { num: '1', title: 'Connect wallet', desc: 'Link your Polkadot wallet — non-custodial and secure.' },
              { num: '2', title: 'Choose a strategy', desc: 'Pick a curated subnet portfolio matching your risk tolerance.' },
              { num: '3', title: 'Delegate', desc: 'Stake once. All delegation happens on-chain with full transparency.' },
              { num: '4', title: 'Earn Rewards', desc: 'We monitor, rebalance, and auto-compound returns.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-white text-4xl font-black min-w-[56px]">{step.num}</div>
                <div className="flex-1">
                  <h3 className="text-white text-lg font-semibold mb-2" style={{ lineHeight: '1.1' }}>{step.title}</h3>
                  <p className="text-gray-300 text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Platform Security */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl md:text-4xl tracking-tight text-center mb-3">Platform Security</h2>
          <p className="text-gray-400 text-base text-center mb-12">Enterprise-grade protection</p>
          <div className="space-y-6 max-w-3xl mx-auto mb-12">
            <div>
              <h4 className="text-white text-sm mb-1">Your funds never leave your wallet</h4>
              <p className="text-gray-300 text-sm">Interact through proxies only when permitted.</p>
            </div>
            <div>
              <h4 className="text-white text-sm mb-1">Non-custodial security</h4>
              <p className="text-gray-300 text-sm">Full control, withdraw anytime — no lockups.</p>
            </div>
            <div>
              <h4 className="text-white text-sm mb-1">Automated Strategies</h4>
              <p className="text-gray-300 text-sm">Choose a profile for max APY, zero micromanaging.</p>
            </div>
          </div>
          <div className="text-center">
            <button className="rounded-xl py-6 px-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-lg">
              Explore Strategies
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl tracking-tight mb-8" style={{ lineHeight: '1.1' }}>Start Earning Passively</h2>
          <p className="text-gray-300 text-base mb-12 max-w-2xl mx-auto">Connect your wallet and choose a strategy. We handle monitoring, rebalancing, and compounding.</p>
          <button
            onClick={() => setWalletModalOpen(true)}
            className="rounded-xl py-6 px-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-lg"
          >
            Delegate Now
          </button>
        </div>
      </section>

      {/* Wallet Modal */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md bg-black border border-gray-900 rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-white text-2xl">Connect Wallet</h4>
              <button
                onClick={() => setWalletModalOpen(false)}
                className="text-gray-300 hover:underline text-sm"
              >
                Close
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
                  className="w-full text-left px-6 py-3 text-gray-300 hover:underline text-sm"
                >
                  {w}
                </button>
              ))}
            </div>
            {loading && <div className="mt-4 text-sm text-gray-300 text-center">Connecting…</div>}
            {error && <div className="mt-4 text-sm text-red-400 text-center">{error}</div>}
            {connectedAccount && (
              <div className="mt-4 text-sm text-gray-300 text-center">Connected: {connectedAccount.slice(0, 8)}...{connectedAccount.slice(-6)}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
