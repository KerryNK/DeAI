import React from 'react';
import { TrendingUp, TrendingDown, Target, DollarSign, Percent } from 'lucide-react';

/**
 * RecommendationCard Component
 * Displays AI-powered investment recommendation
 */
const RecommendationCard = ({ recommendation }) => {
    const getActionStyles = (action) => {
        switch (action) {
            case 'Strong Buy':
                return {
                    bg: 'bg-gradient-to-r from-emerald-500/30 to-emerald-600/30',
                    border: 'border-emerald-500/50',
                    text: 'text-emerald-400',
                    icon: <TrendingUp size={24} className="text-emerald-400" />
                };
            case 'Buy':
                return {
                    bg: 'bg-gradient-to-r from-lime-500/30 to-lime-600/30',
                    border: 'border-lime-500/50',
                    text: 'text-lime-400',
                    icon: <TrendingUp size={24} className="text-lime-400" />
                };
            case 'Hold':
                return {
                    bg: 'bg-gradient-to-r from-yellow-500/30 to-yellow-600/30',
                    border: 'border-yellow-500/50',
                    text: 'text-yellow-400',
                    icon: <Target size={24} className="text-yellow-400" />
                };
            case 'Reduce':
                return {
                    bg: 'bg-gradient-to-r from-orange-500/30 to-orange-600/30',
                    border: 'border-orange-500/50',
                    text: 'text-orange-400',
                    icon: <TrendingDown size={24} className="text-orange-400" />
                };
            case 'Sell':
            case 'Avoid':
                return {
                    bg: 'bg-gradient-to-r from-red-500/30 to-red-600/30',
                    border: 'border-red-500/50',
                    text: 'text-red-400',
                    icon: <TrendingDown size={24} className="text-red-400" />
                };
            default:
                return {
                    bg: 'bg-slate-700/30',
                    border: 'border-slate-600/50',
                    text: 'text-gray-400',
                    icon: <Target size={24} className="text-gray-400" />
                };
        }
    };

    const styles = getActionStyles(recommendation.action);

    return (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl border border-purple-500/40 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-purple-400">🎯</span>
                Investment Recommendation
            </h3>

            {/* Action Badge */}
            <div className={`${styles.bg} border ${styles.border} rounded-xl p-6 mb-6`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {styles.icon}
                        <div>
                            <div className="text-sm text-gray-400 mb-1">Recommended Action</div>
                            <div className={`text-3xl font-bold ${styles.text}`}>
                                {recommendation.action}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Confidence</div>
                        <div className={`text-3xl font-bold ${styles.text}`}>
                            {recommendation.confidence}
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Target size={16} className="text-purple-400" />
                        <div className="text-sm text-gray-400">Target Allocation</div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {recommendation.targetAllocation}
                    </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={16} className="text-purple-400" />
                        <div className="text-sm text-gray-400">Position Size</div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {recommendation.positionSize}
                    </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Percent size={16} className="text-purple-400" />
                        <div className="text-sm text-gray-400">Expected Return</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">
                        {recommendation.expectedReturn}
                    </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Percent size={16} className="text-purple-400" />
                        <div className="text-sm text-gray-400">Risk-Adjusted</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-400">
                        {recommendation.riskAdjustedReturn}
                    </div>
                </div>
            </div>

            {/* Rationale */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 mb-6">
                <div className="text-sm font-semibold text-gray-300 mb-2">Rationale</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                    {recommendation.rationale}
                </p>
            </div>

            {/* Key Metrics Summary */}
            <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-gray-500 mb-1">Health</div>
                    <div className={`font-bold ${recommendation.metrics.healthScore >= 80 ? 'text-emerald-400' :
                            recommendation.metrics.healthScore >= 50 ? 'text-yellow-400' :
                                'text-red-400'
                        }`}>
                        {recommendation.metrics.healthScore}
                    </div>
                </div>
                <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-gray-500 mb-1">Momentum</div>
                    <div className={`font-bold ${recommendation.metrics.momentum === 'BULLISH' ? 'text-emerald-400' :
                            recommendation.metrics.momentum === 'NEUTRAL' ? 'text-yellow-400' :
                                'text-red-400'
                        }`}>
                        {recommendation.metrics.momentum}
                    </div>
                </div>
                <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-gray-500 mb-1">Valuation</div>
                    <div className={`font-bold ${recommendation.metrics.valuation === 'UNDERVALUED' ? 'text-emerald-400' :
                            recommendation.metrics.valuation === 'FAIR VALUE' ? 'text-yellow-400' :
                                'text-red-400'
                        }`}>
                        {recommendation.metrics.valuation.split(' ')[0]}
                    </div>
                </div>
                <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-gray-500 mb-1">Risk</div>
                    <div className={`font-bold ${recommendation.riskLevel === 'Low' ? 'text-emerald-400' :
                            recommendation.riskLevel === 'Medium' ? 'text-yellow-400' :
                                'text-red-400'
                        }`}>
                        {recommendation.riskLevel}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;
