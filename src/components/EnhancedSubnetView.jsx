import React, { useState, useMemo } from 'react';
import { Zap, Info, DollarSign } from 'lucide-react';
import ScoreCard from './ScoreCard';
import HealthGauge from './HealthGauge';
import RiskIndicator from './RiskIndicator';
import AlertPanel from './AlertPanel';
import RecommendationCard from './RecommendationCard';
import {
    calculateAllMetrics,
    calculateSubnetHealthScore,
    calculateCVS,
    calculateNFMI
} from '../utils/calculators';
import { checkAlerts } from '../utils/alerts';
import { generateRecommendation } from '../utils/recommendations';
import { enhanceSubnetData } from '../utils/dataEnhancer';

/**
 * Enhanced Subnet Detail View
 * Shows comprehensive scoring metrics for a single subnet
 */
const EnhancedSubnetView = ({ subnet, taoPrice, onClose }) => {
    // Enhance subnet data with required fields
    const enhancedSubnet = enhanceSubnetData(subnet);

    // Calculate all metrics
    const metrics = calculateAllMetrics(enhancedSubnet, taoPrice);
    const recommendation = generateRecommendation(enhancedSubnet, taoPrice);
    const alerts = checkAlerts(enhancedSubnet);

    // Mock percentiles and deltas for demonstration
    const percentiles = {
        healthScore: 75,
        emissionYield: 68,
        nfmi: 72,
        cvs: 65
    };

    const deltas = {
        healthScore: 2.3,
        emissionYield: -0.5,
        nfmi: 0.12,
        cvs: 0.3
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                SN{subnet.id}: {subnet.name}
                            </h2>
                            <p className="text-gray-400">{subnet.description}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all"
                        >
                            Close
                        </button>
                    </div>

                    {/* Alerts */}
                    {alerts.length > 0 && (
                        <div className="mb-6">
                            <AlertPanel alerts={alerts} />
                        </div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Score Card */}
                        <ScoreCard
                            metrics={metrics}
                            percentiles={percentiles}
                            deltas={deltas}
                        />

                        {/* Health Gauge */}
                        <HealthGauge
                            score={metrics.healthScore.total}
                            breakdown={metrics.healthScore.breakdown}
                        />
                    </div>

                    {/* Risk and Recommendation */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Risk Indicator */}
                        <RiskIndicator
                            cvs={metrics.cvs}
                            giniCoefficient={enhancedSubnet.gini_stake}
                            securityAudit={subnet.securityAudit}
                            validatorCount={enhancedSubnet.active_validators}
                            totalValidators={enhancedSubnet.total_validators}
                        />

                        {/* Recommendation Card */}
                        <RecommendationCard recommendation={recommendation} />
                    </div>

                    {/* Key Metrics Summary */}
                    <div className="mt-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl border border-purple-500/40 p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Additional Metrics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-700/30 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-1">Fair Value Ratio</div>
                                <div className="text-2xl font-bold text-white">
                                    {metrics.fairValue.ratio.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{metrics.fairValue.status}</div>
                            </div>
                            <div className="bg-slate-700/30 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-1">Position Size</div>
                                <div className="text-2xl font-bold text-purple-400">
                                    {metrics.positionSize.percentage}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{metrics.positionSize.recommendation}</div>
                            </div>
                            <div className="bg-slate-700/30 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-1">Risk-Adjusted Return</div>
                                <div className="text-2xl font-bold text-emerald-400">
                                    {metrics.riskAdjustedReturn.rar}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Sharpe: {metrics.riskAdjustedReturn.sharpeRatio}</div>
                            </div>
                            <div className="bg-slate-700/30 rounded-lg p-4">
                                <div className="text-sm text-gray-400 mb-1">NFMI</div>
                                <div className={`text-2xl font-bold ${metrics.nfmi.signal === 'BULLISH' ? 'text-emerald-400' :
                                        metrics.nfmi.signal === 'NEUTRAL' ? 'text-yellow-400' :
                                            'text-red-400'
                                    }`}>
                                    {metrics.nfmi.index.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{metrics.nfmi.signal}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedSubnetView;
