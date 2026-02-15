import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../lib/walletContext';

export default function Home() {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { account: connectedAccount, loading, error, connect: connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-[var(--inst-bg)] text-[var(--inst-text)]">
      {/* Hero – institutional headline */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-inst-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative text-center">
          <p className="text-inst-accent text-sm font-semibold uppercase tracking-widest mb-6">
            Bittensor Subnet Intelligence
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-inst-text tracking-tight mb-6" style={{ lineHeight: 1.1 }}>
            Institutional-grade access to decentralized AI
          </h1>
          <p className="text-inst-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Curated subnet portfolios, daily rebalancing, and transparent on-chain execution. No technical setup required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setWalletModalOpen(true)}
              className="px-8 py-4 bg-inst-accent hover:bg-sky-500 text-white font-semibold rounded-xl transition border border-transparent shadow-lg shadow-inst-accent/20"
            >
              {connectedAccount
                ? `Connected: ${connectedAccount.slice(0, 6)}…${connectedAccount.slice(-4)}`
                : 'Connect Wallet'}
            </button>
            <Link
              to="/strategies"
              className="px-8 py-4 bg-transparent border border-inst-border text-inst-text font-semibold rounded-xl hover:bg-inst-bg-card hover:border-inst-text-muted transition"
            >
              View Strategies
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar – single line stats */}
      <section className="border-y border-inst-border bg-inst-bg-elevated">
        <div className="max-w-6xl mx-auto py-8 px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
            <div>
              <div className="font-serif text-2xl md:text-3xl text-inst-text tabular-nums">
                13,138.42 τ
              </div>
              <div className="text-inst-text-faint text-sm mt-0.5">≈ $2,115,018</div>
            </div>
            <div className="w-px h-10 bg-inst-border hidden sm:block" />
            <div>
              <div className="text-inst-text font-semibold tabular-nums">+49.41%</div>
              <div className="text-inst-text-faint text-sm mt-0.5">7d performance</div>
            </div>
            <div className="w-px h-10 bg-inst-border hidden sm:block" />
            <div>
              <div className="text-inst-text font-semibold">Assets Under Management</div>
              <div className="text-inst-text-faint text-sm mt-0.5">On-chain, transparent</div>
            </div>
          </div>
        </div>
      </section>

      {connectedAccount ? (
        <>
          {/* Yield opportunities – card grid */}
          <section className="py-20 md:py-28 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-inst-text text-center mb-4">
                Yield opportunities
              </h2>
              <p className="text-inst-text-muted text-center max-w-xl mx-auto mb-12">
                Choose a strategy that matches your risk profile. We monitor, rebalance, and compound.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-inst-bg-card border border-inst-border rounded-2xl p-8 md:p-10 text-center hover:border-inst-border-subtle transition">
                  <p className="text-inst-text-faint text-sm font-semibold uppercase tracking-wider mb-2">Higher growth</p>
                  <div className="font-serif text-4xl md:text-5xl text-inst-accent tabular-nums mb-1">183.88%+</div>
                  <p className="text-inst-text-muted text-sm mb-6">APY</p>
                  <p className="text-inst-text-muted text-base">
                    Optimized subnet exposure for maximum yield potential.
                  </p>
                </div>
                <div className="bg-inst-bg-card border border-inst-border rounded-2xl p-8 md:p-10 text-center hover:border-inst-border-subtle transition">
                  <p className="text-inst-text-faint text-sm font-semibold uppercase tracking-wider mb-2">Stable</p>
                  <div className="font-serif text-4xl md:text-5xl text-inst-success tabular-nums mb-1">7.96%</div>
                  <p className="text-inst-text-muted text-sm mb-6">APY</p>
                  <p className="text-inst-text-muted text-base">
                    Keep your TAO principal. Dividends auto-staked into subnets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How it works – numbered steps */}
          <section id="how-it-works" className="py-20 md:py-28 px-6 bg-inst-bg-elevated border-y border-inst-border">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-inst-text text-center mb-4">
                How it works
              </h2>
              <p className="text-inst-text-muted text-center mb-16">
                Four steps to passive exposure to Bittensor subnets.
              </p>
              <div className="space-y-12">
                {[
                  { num: '01', title: 'Connect wallet', desc: 'Link your Polkadot-compatible wallet. Non-custodial and secure.' },
                  { num: '02', title: 'Choose a strategy', desc: 'Pick a curated subnet portfolio that matches your risk tolerance.' },
                  { num: '03', title: 'Delegate', desc: 'Stake once. All delegation happens on-chain with full transparency.' },
                  { num: '04', title: 'Earn rewards', desc: 'We monitor, rebalance, and auto-compound returns for you.' },
                ].map((step) => (
                  <div key={step.num} className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="font-serif text-3xl text-inst-text-faint shrink-0 w-12">{step.num}</div>
                    <div className="flex-1">
                      <h3 className="text-inst-text text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-inst-text-muted">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Security & trust */}
          <section className="py-20 md:py-28 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-inst-text mb-2">
                Platform security
              </h2>
              <p className="text-inst-text-muted mb-12">Enterprise-grade protection for your assets.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                <div className="bg-inst-bg-card border border-inst-border rounded-xl p-6">
                  <h4 className="text-inst-text font-semibold mb-2">Non-custodial</h4>
                  <p className="text-inst-text-muted text-sm">Your funds never leave your wallet. We interact through proxies only when you approve.</p>
                </div>
                <div className="bg-inst-bg-card border border-inst-border rounded-xl p-6">
                  <h4 className="text-inst-text font-semibold mb-2">Full control</h4>
                  <p className="text-inst-text-muted text-sm">Withdraw anytime. No lockups. You retain full control of your TAO and delegations.</p>
                </div>
                <div className="bg-inst-bg-card border border-inst-border rounded-xl p-6">
                  <h4 className="text-inst-text font-semibold mb-2">Automated strategies</h4>
                  <p className="text-inst-text-muted text-sm">Choose a risk profile. We handle rebalancing and compounding—zero micromanaging.</p>
                </div>
              </div>
              <Link
                to="/strategies"
                className="inline-block mt-12 px-8 py-4 bg-inst-accent hover:bg-sky-500 text-white font-semibold rounded-xl transition"
              >
                Explore strategies
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 md:py-28 px-6 border-t border-inst-border bg-inst-bg-elevated">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-5xl text-inst-text mb-6" style={{ lineHeight: 1.15 }}>
                Start earning passively
              </h2>
              <p className="text-inst-text-muted text-lg mb-10">
                Connect your wallet and choose a strategy. We handle monitoring, rebalancing, and compounding.
              </p>
              <button
                onClick={() => setWalletModalOpen(true)}
                className="px-8 py-4 bg-inst-accent hover:bg-sky-500 text-white font-semibold rounded-xl transition"
              >
                Delegate now
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className="py-16 px-6 text-center border-t border-inst-border">
          <p className="text-inst-text-muted max-w-md mx-auto">
            Connect your wallet to view personalized yields, strategies, and platform details.
          </p>
        </section>
      )}

      {/* Footer – institutional */}
      <footer className="border-t border-inst-border bg-inst-bg-elevated py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg text-inst-text">DeAI</span>
            <span className="font-sans font-semibold text-inst-accent">Nexus</span>
          </div>
          <div className="text-inst-text-faint text-sm flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <span>Bittensor Network</span>
            <span>•</span>
            <span>Non-custodial</span>
            <span>•</span>
            <span>On-chain execution</span>
          </div>
        </div>
      </footer>

      {/* Wallet modal */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-inst-bg-card border border-inst-border rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-serif text-2xl text-inst-text">Connect wallet</h4>
              <button
                onClick={() => setWalletModalOpen(false)}
                className="text-inst-text-muted hover:text-inst-text p-2 rounded-lg hover:bg-inst-bg-elevated transition"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-inst-text-muted text-sm mb-6">
              Select a wallet to connect. Supported: Talisman, Nova Wallet, Subwallet.
            </p>
            <div className="flex flex-col gap-2">
              {['Talisman', 'Nova Wallet', 'Subwallet'].map((w) => (
                <button
                  key={w}
                  onClick={async () => {
                    await connectWallet();
                    setWalletModalOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 rounded-xl border border-inst-border text-inst-text font-medium hover:bg-inst-bg-elevated hover:border-inst-text-muted transition"
                >
                  {w}
                </button>
              ))}
            </div>
            {loading && <p className="mt-4 text-sm text-inst-text-muted text-center">Connecting…</p>}
            {error && <p className="mt-4 text-sm text-inst-error text-center">{error}</p>}
            {connectedAccount && (
              <p className="mt-4 text-sm text-inst-success text-center">
                Connected: {connectedAccount.slice(0, 8)}…{connectedAccount.slice(-6)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
