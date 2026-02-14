import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans">
      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-white text-2xl md:text-3xl tracking-tight">Your Wallet</h2>
          <p className="text-gray-300 mt-4">Connected: —</p>
        </div>

        <div className="py-12 md:py-16 border border-gray-900 p-8 md:p-10 rounded-md">
          <h3 className="text-gray-400 text-sm mb-4">Assets Under Management</h3>
          <div className="text-center">
            <div className="text-white text-4xl md:text-6xl tracking-tight leading-[1.1]">
              13,138.42 τ ≈ $2,115,018 <span className="text-white">(</span>
              <span className="text-white">+49.41% 7d</span>
              <span className="text-white">)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-white text-2xl md:text-3xl tracking-tight mb-8">Yield Opportunities</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <article
              key={i}
              className="bg-black border border-gray-900 p-8 md:p-10 rounded-md"
            >
              <div className="text-gray-400 text-sm mb-4">Strategy {i}</div>

              <div className="text-center">
                <div className="text-cyan-400 text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
                  12.45%
                </div>
                <div className="text-gray-300 mt-4">Estimated APY</div>
              </div>

              <div className="mt-8 flex gap-4 justify-center">
                <button className="rounded-xl py-6 px-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-base">
                  Deposit
                </button>
                <button className="text-gray-300 hover:underline self-center">Details</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-white text-2xl md:text-3xl tracking-tight mb-6">How it works</h2>
        <p className="text-gray-300">Simple, institutional-grade yield strategies executed on-chain.</p>
      </section>

      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-white text-2xl md:text-3xl tracking-tight mb-6">Platform Security</h2>
        <p className="text-gray-300">Audited contracts, multi-sig custody, and continuous monitoring.</p>
      </section>

      <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-white text-3xl md:text-4xl tracking-tight mb-6">Get started</h3>
        <div className="flex items-center justify-center gap-6">
          <button className="rounded-xl py-6 px-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg">
            Connect Wallet
          </button>
          <button className="text-gray-300 hover:underline">Learn More</button>
        </div>
      </section>
    </main>
  );
}
