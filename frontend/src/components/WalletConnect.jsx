import { Wallet, ArrowRight } from 'lucide-react';

export default function WalletConnect({
  onConnect,
  isLoading = false,
  title = "Connect Your Wallet",
  subtitle = "Securely connect your wallet to get started",
  buttonText = "Connect Wallet"
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl">
            <Wallet className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 mb-12 leading-relaxed">
          {subtitle}
        </p>

        {/* Main CTA Button */}
        <button
          onClick={onConnect}
          disabled={isLoading}
          className="w-full mb-6 px-8 py-4 md:py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl rounded-xl transition duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <>
              <div className="animate-spin">
                <Wallet className="w-6 h-6" />
              </div>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <span>{buttonText}</span>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -ml-2 transition-opacity" />
            </>
          )}
        </button>

        {/* Trust indicators */}
        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-cyan-600 rounded-full"></div>
            <span>Non-custodial & secure</span>
            <div className="w-1 h-1 bg-cyan-600 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-600">
            Your funds stay in your wallet at all times
          </div>
        </div>

        {/* Optional divider & secondary action */}
        <div className="mt-12 pt-8 border-t border-gray-900">
          <p className="text-gray-500 text-sm mb-4">
            New to crypto wallets?
          </p>
          <a
            href="#"
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
          >
            Learn how to set up a wallet →
          </a>
        </div>
      </div>
    </div>
  );
}
