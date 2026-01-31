/**
 * Investment Recommendation Engine for Bittensor Subnets
 * Generates buy/sell/hold recommendations based on comprehensive scoring
 */

import {
    calculateSubnetHealthScore,
    calculateNFMI,
    calculateEmissionYieldScore,
    calculateCVS,
    calculatePositionSize,
    calculateRiskAdjustedReturn
} from './calculators.js';

/**
 * Recommendation actions
 */
export const RecommendationAction = {
    STRONG_BUY: 'Strong Buy',
    BUY: 'Buy',
    HOLD: 'Hold',
    REDUCE: 'Reduce',
    SELL: 'Sell',
    AVOID: 'Avoid'
};

/**
 * Generate investment recommendation for a subnet
 * @param {Object} subnet - Subnet data
 * @param {number} taoPrice - Current TAO price
 * @param {number} portfolioSize - User's portfolio size in TAO
 * @returns {Object} Recommendation object
 */
export function generateRecommendation(subnet, taoPrice = 283.63, portfolioSize = 100) {
    // Calculate all metrics
    const healthScore = calculateSubnetHealthScore(subnet);
    const nfmi = calculateNFMI(subnet);
    const eys = calculateEmissionYieldScore(subnet, taoPrice);
    const cvs = calculateCVS(subnet);
    const positionSize = calculatePositionSize(subnet, portfolioSize);
    const rar = calculateRiskAdjustedReturn(subnet);

    // Decision matrix
    let action, confidence, rationale = [];

    // Health Score Categories
    const isHighHealth = healthScore.total >= 80;
    const isMediumHealth = healthScore.total >= 50 && healthScore.total < 80;
    const isLowHealth = healthScore.total < 50;

    // Momentum Categories
    const isBullish = nfmi.signal === 'BULLISH';
    const isNeutral = nfmi.signal === 'NEUTRAL';
    const isBearish = nfmi.signal === 'BEARISH';

    // Valuation Categories
    const isUndervalued = eys.signal === 'UNDERVALUED';
    const isFairValue = eys.signal === 'FAIR VALUE';
    const isOvervalued = eys.signal === 'OVERVALUED';

    // Risk Categories
    const isLowRisk = cvs.riskLevel === 'LOW RISK';
    const isMediumRisk = cvs.riskLevel === 'MEDIUM RISK';
    const isHighRisk = cvs.riskLevel === 'HIGH RISK' || cvs.riskLevel === 'CRITICAL RISK';

    // Apply decision matrix
    if (isLowHealth) {
        action = RecommendationAction.AVOID;
        confidence = 85;
        rationale.push('Low health score indicates fundamental issues');
        rationale.push('Multiple risk factors present');
    } else if (isHighHealth && isBullish && isUndervalued && !isHighRisk) {
        action = RecommendationAction.STRONG_BUY;
        confidence = 90;
        rationale.push('Excellent fundamentals with strong health score');
        rationale.push('Bullish momentum and undervalued metrics');
        rationale.push('Acceptable decentralization risk');
    } else if (isHighHealth && isBullish && !isHighRisk) {
        action = RecommendationAction.BUY;
        confidence = 80;
        rationale.push('Strong health score and positive momentum');
        rationale.push('Good entry opportunity');
    } else if (isHighHealth && isNeutral && isUndervalued) {
        action = RecommendationAction.BUY;
        confidence = 75;
        rationale.push('Solid fundamentals with value opportunity');
        rationale.push('Neutral momentum allows for accumulation');
    } else if (isMediumHealth && isBullish && isUndervalued) {
        action = RecommendationAction.BUY;
        confidence = 70;
        rationale.push('Momentum and valuation support entry');
        rationale.push('Monitor health metrics for improvement');
    } else if (isHighHealth && isBearish) {
        action = RecommendationAction.HOLD;
        confidence = 65;
        rationale.push('Strong fundamentals offset by weak momentum');
        rationale.push('Wait for momentum reversal');
    } else if (isMediumHealth && isNeutral && isFairValue) {
        action = RecommendationAction.HOLD;
        confidence = 60;
        rationale.push('Balanced risk-reward profile');
        rationale.push('No compelling catalyst for change');
    } else if (isMediumHealth && isBearish) {
        action = RecommendationAction.REDUCE;
        confidence = 70;
        rationale.push('Weakening momentum with moderate fundamentals');
        rationale.push('Consider reducing exposure');
    } else if (isOvervalued && !isBullish) {
        action = RecommendationAction.REDUCE;
        confidence = 75;
        rationale.push('Overvalued relative to emissions');
        rationale.push('Limited upside potential');
    } else if (isHighRisk) {
        action = RecommendationAction.REDUCE;
        confidence = 80;
        rationale.push('High centralization risk');
        rationale.push(`CVS at ${cvs.score.toFixed(2)}% indicates vulnerability`);
    } else {
        action = RecommendationAction.HOLD;
        confidence = 55;
        rationale.push('Mixed signals across metrics');
        rationale.push('Maintain current position');
    }

    // Adjust confidence based on additional factors
    if (subnet.securityAudit) {
        confidence += 5;
        rationale.push('Security audit completed');
    }

    if (subnet.age < 6) {
        confidence -= 10;
        rationale.push('Young subnet - higher uncertainty');
    }

    if (healthScore.breakdown.decentralization < 40) {
        confidence -= 10;
    }

    // Cap confidence
    confidence = Math.min(95, Math.max(30, confidence));

    // Calculate target allocation
    let targetAllocation;
    if (action === RecommendationAction.STRONG_BUY) {
        targetAllocation = '8-10%';
    } else if (action === RecommendationAction.BUY) {
        targetAllocation = '5-8%';
    } else if (action === RecommendationAction.HOLD) {
        targetAllocation = '3-5%';
    } else if (action === RecommendationAction.REDUCE) {
        targetAllocation = '1-3%';
    } else {
        targetAllocation = '0%';
    }

    // Risk level for allocation
    let riskLevel;
    if (isLowRisk && isHighHealth) {
        riskLevel = 'Low';
    } else if (isMediumRisk || isMediumHealth) {
        riskLevel = 'Medium';
    } else {
        riskLevel = 'High';
    }

    return {
        action,
        confidence: `${confidence}%`,
        confidenceScore: confidence,
        targetAllocation,
        riskLevel,
        rationale: rationale.join('. '),
        metrics: {
            healthScore: healthScore.total,
            momentum: nfmi.signal,
            valuation: eys.signal,
            decentralization: cvs.riskLevel
        },
        positionSize: positionSize.percentage,
        riskAdjustedReturn: rar.rar,
        expectedReturn: rar.expectedAPR
    };
}

/**
 * Compare two subnets and recommend allocation
 * @param {Object} subnet1 - First subnet
 * @param {Object} subnet2 - Second subnet
 * @param {number} taoPrice - Current TAO price
 * @returns {Object} Comparison and allocation recommendation
 */
export function compareSubnets(subnet1, subnet2, taoPrice = 283.63) {
    const rec1 = generateRecommendation(subnet1, taoPrice);
    const rec2 = generateRecommendation(subnet2, taoPrice);

    const health1 = calculateSubnetHealthScore(subnet1);
    const health2 = calculateSubnetHealthScore(subnet2);

    let allocation, reasoning;

    if (rec1.confidenceScore > rec2.confidenceScore + 15) {
        allocation = { subnet1: 70, subnet2: 30 };
        reasoning = `${subnet1.name} shows significantly stronger metrics`;
    } else if (rec2.confidenceScore > rec1.confidenceScore + 15) {
        allocation = { subnet1: 30, subnet2: 70 };
        reasoning = `${subnet2.name} shows significantly stronger metrics`;
    } else {
        allocation = { subnet1: 50, subnet2: 50 };
        reasoning = 'Both subnets show comparable strength - balanced allocation';
    }

    return {
        subnet1: {
            name: subnet1.name,
            recommendation: rec1,
            healthScore: health1.total
        },
        subnet2: {
            name: subnet2.name,
            recommendation: rec2,
            healthScore: health2.total
        },
        allocation,
        reasoning
    };
}

/**
 * Generate portfolio allocation across multiple subnets
 * @param {Array} subnets - Array of subnet data
 * @param {number} taoPrice - Current TAO price
 * @param {number} maxPositions - Maximum number of positions (default 5)
 * @returns {Array} Sorted allocation recommendations
 */
export function generatePortfolioAllocation(subnets, taoPrice = 283.63, maxPositions = 5) {
    // Generate recommendations for all subnets
    const recommendations = subnets.map(subnet => ({
        subnet,
        recommendation: generateRecommendation(subnet, taoPrice)
    }));

    // Filter to buy recommendations only
    const buyRecommendations = recommendations.filter(r =>
        r.recommendation.action === RecommendationAction.STRONG_BUY ||
        r.recommendation.action === RecommendationAction.BUY
    );

    // Sort by confidence score
    buyRecommendations.sort((a, b) =>
        b.recommendation.confidenceScore - a.recommendation.confidenceScore
    );

    // Take top N positions
    const topPositions = buyRecommendations.slice(0, maxPositions);

    // Calculate allocation percentages
    const totalConfidence = topPositions.reduce((sum, r) =>
        sum + r.recommendation.confidenceScore, 0
    );

    const allocations = topPositions.map(r => ({
        netuid: r.subnet.id,
        name: r.subnet.name,
        allocation: ((r.recommendation.confidenceScore / totalConfidence) * 100).toFixed(2) + '%',
        action: r.recommendation.action,
        confidence: r.recommendation.confidence,
        rationale: r.recommendation.rationale
    }));

    return allocations;
}
