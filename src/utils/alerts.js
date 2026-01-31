/**
 * Alert System for Bittensor Subnet Monitoring
 * Triggers critical, warning, and informational alerts based on metric thresholds
 */

import { calculateCVS, calculateNFMI, calculateEmissionYieldScore } from './calculators.js';

/**
 * Alert severity levels
 */
export const AlertSeverity = {
    CRITICAL: 'critical',
    WARNING: 'warning',
    INFO: 'info'
};

/**
 * Alert types
 */
export const AlertType = {
    CVS_CRITICAL: 'cvs_critical',
    CVS_WARNING: 'cvs_warning',
    GINI_CRITICAL: 'gini_critical',
    GINI_WARNING: 'gini_warning',
    EMISSION_DROP: 'emission_drop',
    EMISSION_SPIKE: 'emission_spike',
    PRICE_DROP: 'price_drop',
    PRICE_SPIKE: 'price_spike',
    SECURITY_BREACH: 'security_breach',
    MOMENTUM_BEARISH: 'momentum_bearish',
    MOMENTUM_BULLISH: 'momentum_bullish',
    STAKE_CONCENTRATION: 'stake_concentration',
    NEW_VALIDATORS: 'new_validators',
    EMISSION_SHARE_INCREASE: 'emission_share_increase'
};

/**
 * Check all alert conditions for a subnet
 * @param {Object} subnet - Current subnet data
 * @param {Object} previousData - Previous subnet data (for change detection)
 * @returns {Array} Array of alert objects
 */
export function checkAlerts(subnet, previousData = null) {
    const alerts = [];

    // CRITICAL ALERTS 🚨

    // CVS Critical
    const cvs = calculateCVS(subnet);
    if (cvs.score < 2) {
        alerts.push({
            severity: AlertSeverity.CRITICAL,
            type: AlertType.CVS_CRITICAL,
            icon: '🚨',
            title: 'Critical Decentralization Risk',
            message: `Only ${subnet.wallets_51} wallets needed for 51% control (${cvs.score.toFixed(2)}%)`,
            metric: 'CVS',
            value: cvs.score,
            threshold: 2,
            action: 'Immediate review required - High centralization risk'
        });
    }

    // Gini Critical
    if (subnet.gini_stake > 0.98) {
        alerts.push({
            severity: AlertSeverity.CRITICAL,
            type: AlertType.GINI_CRITICAL,
            icon: '🚨',
            title: 'Extreme Stake Concentration',
            message: `Gini coefficient at ${(subnet.gini_stake * 100).toFixed(1)}%`,
            metric: 'Gini',
            value: subnet.gini_stake,
            threshold: 0.98,
            action: 'Avoid investment - Extremely centralized'
        });
    }

    // Emission Drop Critical
    if (previousData && previousData.dailyEmission) {
        const emissionChange = ((subnet.dailyEmission - previousData.dailyEmission) / previousData.dailyEmission) * 100;
        if (emissionChange < -20) {
            alerts.push({
                severity: AlertSeverity.CRITICAL,
                type: AlertType.EMISSION_DROP,
                icon: '🚨',
                title: 'Major Emission Drop',
                message: `Daily emissions dropped ${Math.abs(emissionChange).toFixed(1)}% in 7 days`,
                metric: 'Emissions',
                value: subnet.dailyEmission,
                change: emissionChange,
                action: 'Investigate cause - May indicate network issues'
            });
        }
    }

    // Price Drop Critical
    if (previousData && previousData.taoInPool && previousData.alphaInPool) {
        const prevPrice = previousData.taoInPool / previousData.alphaInPool;
        const currentPrice = subnet.taoInPool / subnet.alphaInPool;
        const priceChange = ((currentPrice - prevPrice) / prevPrice) * 100;

        if (priceChange < -30) {
            alerts.push({
                severity: AlertSeverity.CRITICAL,
                type: AlertType.PRICE_DROP,
                icon: '🚨',
                title: 'Severe Price Decline',
                message: `Alpha price dropped ${Math.abs(priceChange).toFixed(1)}% in 7 days`,
                metric: 'Alpha Price',
                value: currentPrice,
                change: priceChange,
                action: 'Review fundamentals - Significant sell pressure'
            });
        }
    }

    // Security Breach
    if (subnet.securityBreach === true) {
        alerts.push({
            severity: AlertSeverity.CRITICAL,
            type: AlertType.SECURITY_BREACH,
            icon: '🚨',
            title: 'Security Breach Reported',
            message: 'Security vulnerability or breach detected',
            metric: 'Security',
            action: 'Avoid until resolved - Security compromised'
        });
    }

    // WARNING ALERTS ⚠️

    // CVS Warning
    if (cvs.score >= 2 && cvs.score < 5) {
        alerts.push({
            severity: AlertSeverity.WARNING,
            type: AlertType.CVS_WARNING,
            icon: '⚠️',
            title: 'Decentralization Concern',
            message: `${subnet.wallets_51} wallets control 51% (${cvs.score.toFixed(2)}%)`,
            metric: 'CVS',
            value: cvs.score,
            threshold: 5,
            action: 'Monitor closely - Moderate centralization risk'
        });
    }

    // Gini Warning
    if (subnet.gini_stake > 0.95 && subnet.gini_stake <= 0.98) {
        alerts.push({
            severity: AlertSeverity.WARNING,
            type: AlertType.GINI_WARNING,
            icon: '⚠️',
            title: 'High Stake Concentration',
            message: `Gini coefficient at ${(subnet.gini_stake * 100).toFixed(1)}%`,
            metric: 'Gini',
            value: subnet.gini_stake,
            threshold: 0.95,
            action: 'Caution advised - High concentration'
        });
    }

    // Emission Change Warning
    if (previousData && previousData.dailyEmission) {
        const emissionChange = Math.abs((subnet.dailyEmission - previousData.dailyEmission) / previousData.dailyEmission) * 100;
        if (emissionChange > 10 && emissionChange <= 20) {
            alerts.push({
                severity: AlertSeverity.WARNING,
                type: emissionChange > 0 ? AlertType.EMISSION_SPIKE : AlertType.EMISSION_DROP,
                icon: '⚠️',
                title: 'Emission Volatility',
                message: `Daily emissions changed ${emissionChange.toFixed(1)}% in 7 days`,
                metric: 'Emissions',
                value: subnet.dailyEmission,
                change: emissionChange,
                action: 'Monitor trend - Unusual emission activity'
            });
        }
    }

    // NFMI Warning
    const nfmi = calculateNFMI(subnet);
    if (nfmi.index < 0.7) {
        alerts.push({
            severity: AlertSeverity.WARNING,
            type: AlertType.MOMENTUM_BEARISH,
            icon: '⚠️',
            title: 'Negative Momentum',
            message: `NFMI at ${nfmi.index.toFixed(2)} - Bearish trend`,
            metric: 'NFMI',
            value: nfmi.index,
            threshold: 0.7,
            action: 'Consider reducing position - Weak momentum'
        });
    }

    // Stake Concentration Change
    if (previousData && previousData.top1_share) {
        const concentrationChange = Math.abs(subnet.top1_share - previousData.top1_share);
        if (concentrationChange > 0.05) {
            alerts.push({
                severity: AlertSeverity.WARNING,
                type: AlertType.STAKE_CONCENTRATION,
                icon: '⚠️',
                title: 'Stake Concentration Shift',
                message: `Top 1% share changed by ${(concentrationChange * 100).toFixed(1)}%`,
                metric: 'Top 1% Share',
                value: subnet.top1_share,
                change: concentrationChange,
                action: 'Review stake distribution - Unusual movement'
            });
        }
    }

    // INFO ALERTS ℹ️

    // Positive Momentum
    if (nfmi.index > 1.2) {
        alerts.push({
            severity: AlertSeverity.INFO,
            type: AlertType.MOMENTUM_BULLISH,
            icon: 'ℹ️',
            title: 'Strong Positive Momentum',
            message: `NFMI at ${nfmi.index.toFixed(2)} - Bullish trend`,
            metric: 'NFMI',
            value: nfmi.index,
            action: 'Favorable conditions for entry'
        });
    }

    // New Validators
    if (previousData && previousData.validatorCount && subnet.validatorCount > previousData.validatorCount) {
        const newValidators = subnet.validatorCount - previousData.validatorCount;
        alerts.push({
            severity: AlertSeverity.INFO,
            type: AlertType.NEW_VALIDATORS,
            icon: 'ℹ️',
            title: 'Network Growth',
            message: `${newValidators} new validator${newValidators > 1 ? 's' : ''} registered`,
            metric: 'Validators',
            value: subnet.validatorCount,
            change: newValidators,
            action: 'Positive network expansion'
        });
    }

    // Emission Share Increase
    if (previousData && previousData.emissionShare) {
        const shareChange = ((subnet.emissionShare - previousData.emissionShare) / previousData.emissionShare) * 100;
        if (shareChange > 2) {
            alerts.push({
                severity: AlertSeverity.INFO,
                type: AlertType.EMISSION_SHARE_INCREASE,
                icon: 'ℹ️',
                title: 'Emission Share Growth',
                message: `Emission share increased ${shareChange.toFixed(1)}% this week`,
                metric: 'Emission Share',
                value: subnet.emissionShare,
                change: shareChange,
                action: 'Growing network influence'
            });
        }
    }

    return alerts;
}

/**
 * Filter alerts by severity
 * @param {Array} alerts - Array of alert objects
 * @param {string} severity - Severity level to filter
 * @returns {Array} Filtered alerts
 */
export function filterAlertsBySeverity(alerts, severity) {
    return alerts.filter(alert => alert.severity === severity);
}

/**
 * Get alert count by severity
 * @param {Array} alerts - Array of alert objects
 * @returns {Object} Count by severity
 */
export function getAlertCounts(alerts) {
    return {
        critical: alerts.filter(a => a.severity === AlertSeverity.CRITICAL).length,
        warning: alerts.filter(a => a.severity === AlertSeverity.WARNING).length,
        info: alerts.filter(a => a.severity === AlertSeverity.INFO).length,
        total: alerts.length
    };
}

/**
 * Check if subnet has any critical alerts
 * @param {Array} alerts - Array of alert objects
 * @returns {boolean} True if critical alerts exist
 */
export function hasCriticalAlerts(alerts) {
    return alerts.some(alert => alert.severity === AlertSeverity.CRITICAL);
}
