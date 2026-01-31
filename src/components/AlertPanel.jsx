import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * AlertPanel Component
 * Displays real-time alerts with severity levels
 */
const AlertPanel = ({ alerts = [], onDismiss }) => {
    const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

    const getAlertIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return <AlertCircle size={20} className="text-red-400" />;
            case 'warning':
                return <AlertTriangle size={20} className="text-yellow-400" />;
            case 'info':
                return <Info size={20} className="text-blue-400" />;
            default:
                return <Info size={20} className="text-gray-400" />;
        }
    };

    const getAlertStyles = (severity) => {
        switch (severity) {
            case 'critical':
                return {
                    bg: 'bg-gradient-to-r from-red-500/20 to-red-600/20',
                    border: 'border-red-500/50',
                    text: 'text-red-400'
                };
            case 'warning':
                return {
                    bg: 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20',
                    border: 'border-yellow-500/50',
                    text: 'text-yellow-400'
                };
            case 'info':
                return {
                    bg: 'bg-gradient-to-r from-blue-500/20 to-blue-600/20',
                    border: 'border-blue-500/50',
                    text: 'text-blue-400'
                };
            default:
                return {
                    bg: 'bg-slate-700/30',
                    border: 'border-slate-600/50',
                    text: 'text-gray-400'
                };
        }
    };

    const handleDismiss = (alertIndex) => {
        setDismissedAlerts(prev => new Set([...prev, alertIndex]));
        if (onDismiss) {
            onDismiss(alertIndex);
        }
    };

    const visibleAlerts = alerts.filter((_, index) => !dismissedAlerts.has(index));

    if (visibleAlerts.length === 0) {
        return null;
    }

    // Group alerts by severity
    const criticalAlerts = visibleAlerts.filter(a => a.severity === 'critical');
    const warningAlerts = visibleAlerts.filter(a => a.severity === 'warning');
    const infoAlerts = visibleAlerts.filter(a => a.severity === 'info');

    return (
        <div className="space-y-4">
            {/* Critical Alerts */}
            {criticalAlerts.length > 0 && (
                <div className="space-y-2">
                    {criticalAlerts.map((alert, index) => {
                        const styles = getAlertStyles(alert.severity);
                        const originalIndex = alerts.indexOf(alert);

                        return (
                            <div
                                key={originalIndex}
                                className={`${styles.bg} border ${styles.border} rounded-xl p-4 animate-fadeIn`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        {alert.icon || getAlertIcon(alert.severity)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h4 className={`font-bold ${styles.text} mb-1`}>
                                                    {alert.title}
                                                </h4>
                                                <p className="text-sm text-gray-300 mb-2">
                                                    {alert.message}
                                                </p>
                                                {alert.action && (
                                                    <p className="text-xs text-gray-400 italic">
                                                        → {alert.action}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDismiss(originalIndex)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                        {(alert.metric || alert.value !== undefined) && (
                                            <div className="mt-3 pt-3 border-t border-white/10 flex gap-4 text-xs">
                                                {alert.metric && (
                                                    <div>
                                                        <span className="text-gray-500">Metric:</span>{' '}
                                                        <span className="text-white font-semibold">{alert.metric}</span>
                                                    </div>
                                                )}
                                                {alert.value !== undefined && (
                                                    <div>
                                                        <span className="text-gray-500">Value:</span>{' '}
                                                        <span className="text-white font-semibold">
                                                            {typeof alert.value === 'number' ? alert.value.toFixed(2) : alert.value}
                                                        </span>
                                                    </div>
                                                )}
                                                {alert.threshold !== undefined && (
                                                    <div>
                                                        <span className="text-gray-500">Threshold:</span>{' '}
                                                        <span className="text-white font-semibold">{alert.threshold}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Warning Alerts */}
            {warningAlerts.length > 0 && (
                <div className="space-y-2">
                    {warningAlerts.map((alert, index) => {
                        const styles = getAlertStyles(alert.severity);
                        const originalIndex = alerts.indexOf(alert);

                        return (
                            <div
                                key={originalIndex}
                                className={`${styles.bg} border ${styles.border} rounded-xl p-4 animate-fadeIn`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        {alert.icon || getAlertIcon(alert.severity)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h4 className={`font-bold ${styles.text} mb-1`}>
                                                    {alert.title}
                                                </h4>
                                                <p className="text-sm text-gray-300">
                                                    {alert.message}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDismiss(originalIndex)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info Alerts */}
            {infoAlerts.length > 0 && (
                <div className="space-y-2">
                    {infoAlerts.map((alert, index) => {
                        const styles = getAlertStyles(alert.severity);
                        const originalIndex = alerts.indexOf(alert);

                        return (
                            <div
                                key={originalIndex}
                                className={`${styles.bg} border ${styles.border} rounded-xl p-3 animate-fadeIn`}
                            >
                                <div className="flex items-center gap-3">
                                    <div>
                                        {alert.icon || getAlertIcon(alert.severity)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm text-gray-300">
                                                <span className="font-semibold text-white">{alert.title}:</span> {alert.message}
                                            </p>
                                            <button
                                                onClick={() => handleDismiss(originalIndex)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AlertPanel;
