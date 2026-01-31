import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * ScoreCard Component
 * Displays comprehensive scoring metrics in a table format
 */
const ScoreCard = ({ metrics, percentiles = {}, deltas = {} }) => {
    const getScoreRating = (score) => {
        if (score >= 80) return { stars: '⭐⭐⭐⭐⭐', color: 'text-emerald-400' };
        if (score >= 65) return { stars: '⭐⭐⭐⭐', color: 'text-lime-400' };
        if (score >= 50) return { stars: '⭐⭐⭐', color: 'text-yellow-400' };
        if (score >= 35) return { stars: '⭐⭐', color: 'text-orange-400' };
        return { stars: '⭐', color: 'text-red-400' };
    };

    const getDeltaIcon = (delta) => {
        if (delta > 0) return <TrendingUp size={14} className="text-emerald-400" />;
        if (delta < 0) return <TrendingDown size={14} className="text-red-400" />;
        return <Minus size={14} className="text-gray-400" />;
    };

    const formatDelta = (delta) => {
        if (!delta) return '—';
        const sign = delta > 0 ? '+' : '';
        return `${sign}${delta.toFixed(1)}`;
    };

    const rows = [
        {
            metric: 'Health Score',
            value: metrics.healthScore?.total || 0,
            percentile: percentiles.healthScore || 0,
            delta: deltas.healthScore || 0,
            isScore: true
        },
        {
            metric: 'Emission Yield',
            value: metrics.emissionYield?.score?.toFixed(2) || '0.00',
            percentile: percentiles.emissionYield || 0,
            delta: deltas.emissionYield || 0,
            signal: metrics.emissionYield?.signal || 'N/A'
        },
        {
            metric: 'NFMI',
            value: metrics.nfmi?.index?.toFixed(2) || '0.00',
            percentile: percentiles.nfmi || 0,
            delta: deltas.nfmi || 0,
            signal: metrics.nfmi?.signal || 'N/A'
        },
        {
            metric: 'CVS',
            value: `${metrics.cvs?.score?.toFixed(1) || '0.0'}%`,
            percentile: percentiles.cvs || 0,
            delta: deltas.cvs || 0,
            risk: metrics.cvs?.riskLevel || 'N/A'
        },
        {
            metric: 'Fair Value Ratio',
            value: metrics.fairValue?.ratio?.toFixed(2) || '0.00',
            percentile: null,
            delta: null,
            status: metrics.fairValue?.status || 'N/A'
        }
    ];

    return (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl border border-purple-500/40 overflow-hidden shadow-2xl">
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-purple-400">📊</span>
                    Score Card
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Metric</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Value</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Percentile</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">7d Δ</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => {
                                const rating = row.isScore ? getScoreRating(row.value) : null;

                                return (
                                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                        <td className="py-3 px-4 text-white font-medium">{row.metric}</td>
                                        <td className={`py-3 px-4 text-center font-bold ${rating ? rating.color : 'text-white'}`}>
                                            {row.value}
                                        </td>
                                        <td className="py-3 px-4 text-center text-gray-300">
                                            {row.percentile !== null ? `P${row.percentile}` : '—'}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {row.delta !== null ? (
                                                <div className="flex items-center justify-center gap-1">
                                                    {getDeltaIcon(row.delta)}
                                                    <span className={row.delta > 0 ? 'text-emerald-400' : row.delta < 0 ? 'text-red-400' : 'text-gray-400'}>
                                                        {formatDelta(row.delta)}
                                                    </span>
                                                </div>
                                            ) : '—'}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {rating ? (
                                                <span className="text-lg">{rating.stars}</span>
                                            ) : row.signal ? (
                                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${row.signal === 'BULLISH' || row.signal === 'UNDERVALUED' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        row.signal === 'BEARISH' || row.signal === 'OVERVALUED' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {row.signal}
                                                </span>
                                            ) : row.risk ? (
                                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${row.risk.includes('LOW') ? 'bg-emerald-500/20 text-emerald-400' :
                                                        row.risk.includes('MEDIUM') ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {row.risk}
                                                </span>
                                            ) : row.status ? (
                                                <span className="text-sm text-gray-300">{row.status}</span>
                                            ) : '—'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;
