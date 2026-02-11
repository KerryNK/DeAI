import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* Hero - Pure Black */}
      <section className="pt-32 pb-40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
            Invest in the next wave of
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI — instantly
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Access curated Bittensor subnet portfolios. No technical setup. Daily rebalancing. Transparent on-chain execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/app/dashboard" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-10 py-7 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              Enter App <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <button className="border border-gray-700 hover:bg-gray-900 text-white px-10 py-7 rounded-full text-lg font-semibold hover:border-gray-600 transition-all duration-200">
              Learn how it works
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar - Pure Black */}
      <section className="py-16 border-t border-gray-900 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "$18.4M", label: "AUM" },
              { value: "2,847", label: "Active Delegators" },
              { value: "32", label: "Subnets Supported" },
              { value: "99.8%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Cards - Pure Black */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "On-chain execution", desc: "Every rebalance happens transparently via smart contracts on Bittensor." },
              { title: "Daily rebalancing", desc: "Portfolios stay aligned with the latest subnet performance." },
              { title: "Non-custodial", desc: "You always retain full control of your TAO." },
            ].map((item, i) => (
              <div key={i} className="bg-black border border-gray-800 rounded-2xl p-10 text-center hover:border-cyan-800/50 transition-all duration-200 hover:-translate-y-1">
                <CheckCircle2 className="h-10 w-10 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Pure Black */}
      <section className="py-40 border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-10">
            Start investing in AI today
          </h2>
          <a 
            href="/app/dashboard" 
            className="text-2xl px-16 py-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full font-bold shadow-2xl shadow-cyan-500/25 inline-block hover:scale-105 transition-all duration-300"
          >
            Enter App →
          </a>
        </div>
      </section>
    </div>
  )
}
