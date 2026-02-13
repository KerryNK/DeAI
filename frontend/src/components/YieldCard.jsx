export default function YieldCard({ title, apy, description }) {
    return (
        <div className="border border-gray-900 rounded-lg p-8 text-center">
            <div className="text-2xl md:text-3xl font-bold mb-4">{title}</div>
            <div className="text-6xl md:text-7xl font-black text-cyan-400 mb-2" style={{ lineHeight: '1.15' }}>{apy}</div>
            <div className="text-gray-400 mb-1 text-sm">APY</div>
            <p className="text-gray-400 mt-6 text-base">{description}</p>
        </div>
    )
}
