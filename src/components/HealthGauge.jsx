import React from 'react';
import { Gauge } from 'lucide-react';

/**
 * HealthGauge Component
 * Circular gauge visualization for Health Score
 */
const HealthGauge = ({ score, breakdown = {} }) => {
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getColor = (score) => {
        if (score >= 80) return '#34d399'; // emerald-400
        if (score >= 65) return '#a3e635'; // lime-400
        if (score >= 50) return '#fbbf24'; // yellow-400
        if (score >= 35) return '#fb923c'; // orange-400
        return '#f87171'; // red-400
    };

    const getGrade = (score) => {
        if (score >= 85) return 'A+';
        if (score >= 80) return 'A';
        if (score >= 75) return 'A-';
        if (score >= 70) return 'B+';
        if (score >= 65) return 'B';
        if (score >= 60) return 'B-';
        if (score >= 55) return 'C+';
        if (score >= 50) return 'C';
        return 'D';
    };

    const color = getColor(score);
    const grade = getGrade(score);

    return (
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur rounded-2xl border border-purple-500/40 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Gauge className="text-purple-400" size={24} />
                Subnet Health Score
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Gauge */}
                <div className="relative">
                    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            stroke="#1e293b"
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Progress circle */}
                        <circle
                            stroke={color}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{
                                strokeDashoffset,
                                transition: 'stroke-dashoffset 1s ease-in-out'
                            }}
                            strokeLinecap="round"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                    </svg>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold" style={{ color }}>
                            {score}
                        </div>
                        <div className="text-sm text-gray-400">/ 100</div>
                        <div className="text-2xl font-bold mt-1" style={{ color }}>
                            {grade}
                        </div>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="flex-1 space-y-3 w-full">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Component Breakdown
                    </h4>

                    {[
                        { name: 'Decentralization', value: breakdown.decentralization || 0, weight: '20%' },
                        { name: 'Performance', value: breakdown.performance || 0, weight: '25%' },
                        { name: 'Economic', value: breakdown.economic || 0, weight: '25%' },
                        { name: 'Activity', value: breakdown.activity || 0, weight: '15%' },
                        { name: 'Security', value: breakdown.security || 0, weight: '15%' }
                    ].map((component, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-300">{component.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-semibold">{component.value}</span>
                                    <span className="text-gray-500 text-xs">({component.weight})</span>
                                </div>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${component.value}%`,
                                        backgroundColor: getColor(component.value)
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-5 gap-2 text-xs">
                    <div className="text-center">
                        <div className="w-full h-2 bg-red-400 rounded mb-1"></div>
                        <span className="text-gray-400">0-35</span>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-2 bg-orange-400 rounded mb-1"></div>
                        <span className="text-gray-400">35-50</span>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-2 bg-yellow-400 rounded mb-1"></div>
                        <span className="text-gray-400">50-65</span>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-2 bg-lime-400 rounded mb-1"></div>
                        <span className="text-gray-400">65-80</span>
                    </div>
                    <div className="text-center">
                        <div className="w-full h-2 bg-emerald-400 rounded mb-1"></div>
                        <span className="text-gray-400">80-100</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthGauge;
