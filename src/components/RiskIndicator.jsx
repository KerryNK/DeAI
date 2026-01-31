import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

/**
 * RiskIndicator Component
 * Displays risk assessment and security metrics
 */
const RiskIndicator = ({ cvs, giniCoefficient, securityAudit, validatorCount, totalValidators }) => {
    const getRiskColor = (riskLevel) => {
        if (riskLevel.includes('LOW')) return 'emerald';
        if (riskLevel.includes('MEDIUM')) return 'yellow';
        if (riskLevel.includes('HIGH')) return 'orange';
        return 'red';
    };

    const getRiskIcon = (riskLevel) => {
        if (riskLevel.includes('LOW')) return <CheckCircle size={20} />;
        if (riskLevel.includes('CRITICAL')) return <XCircle size={20} />;
        return <AlertTriangle size={20} />;
    };

    const color = getRiskColor(cvs.riskLevel);
    const icon = getRiskIcon(cvs.riskLevel);

    return (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl border border-purple-500/40 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-purple-400" size={24} />
                Risk Assessment
            </h3>

            {/* Risk Level Badge */}
            <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 border border-${color}-500/50`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`text-${color}-400`}>
                            {icon}
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Risk Level</div>
                            <div className={`text-2xl font-bold text-${color}-400`}>
                                {cvs.riskLevel}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400">CVS Score</div>
                        <div className={`text-3xl font-bold text-${color}-400`}>
                            {cvs.score.toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Metrics */}
            <div className="space-y-4">
                {/* Coalition Vulnerability */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="text-sm font-semibold text-gray-300">Coalition Vulnerability</div>
                            <div className="text-xs text-gray-500 mt-1">{cvs.interpretation}</div>
                        </div>
                        <div className={`text-xl font-bold text-${color}-400`}>
                            {cvs.score.toFixed(2)}%
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                        <div>
                            <span className="font-semibold text-white">{cvs.walletsFor51}</span> wallets for 51%
                        </div>
                        <div>
                            <span className="font-semibold text-white">{cvs.totalWallets}</span> total wallets
                        </div>
                    </div>
                </div>

                {/* Gini Coefficient */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-semibold text-gray-300">Gini Coefficient</div>
                        <div className={`text-xl font-bold ${giniCoefficient > 0.95 ? 'text-red-400' :
                                giniCoefficient > 0.90 ? 'text-yellow-400' :
                                    'text-emerald-400'
                            }`}>
                            {(giniCoefficient * 100).toFixed(1)}%
                        </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${giniCoefficient > 0.95 ? 'bg-red-400' :
                                    giniCoefficient > 0.90 ? 'bg-yellow-400' :
                                        'bg-emerald-400'
                                }`}
                            style={{ width: `${giniCoefficient * 100}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        {giniCoefficient > 0.95 ? 'Highly concentrated' :
                            giniCoefficient > 0.90 ? 'Moderately concentrated' :
                                'Well distributed'}
                    </div>
                </div>

                {/* Validator Activity */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-semibold text-gray-300">Validator Activity</div>
                        <div className="text-xl font-bold text-purple-400">
                            {validatorCount}/{totalValidators}
                        </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-purple-400 transition-all duration-500"
                            style={{ width: `${(validatorCount / totalValidators) * 100}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        {((validatorCount / totalValidators) * 100).toFixed(1)}% active validators
                    </div>
                </div>

                {/* Security Audit */}
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-gray-300">Security Audit</div>
                        <div className="flex items-center gap-2">
                            {securityAudit ? (
                                <>
                                    <CheckCircle size={18} className="text-emerald-400" />
                                    <span className="text-emerald-400 font-semibold">Completed</span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={18} className="text-red-400" />
                                    <span className="text-red-400 font-semibold">Not Audited</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Interpretation */}
            <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="text-sm text-gray-400 leading-relaxed">
                    <span className="font-semibold text-white">Interpretation:</span> {cvs.interpretation}
                    {!securityAudit && ' Security audit recommended before significant investment.'}
                </div>
            </div>
        </div>
    );
};

export default RiskIndicator;
