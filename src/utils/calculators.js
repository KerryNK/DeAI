/**
 * Bittensor Subnet Scoring Calculators
 * Implements 7 core scoring algorithms for subnet analysis
 */

/**
 * 1. SUBNET HEALTH SCORE (SHS) Calculator
 * Formula: SHS = 0.20×D + 0.25×P + 0.25×E + 0.15×A + 0.15×S
 * 
 * @param {Object} subnet - Subnet data
 * @returns {Object} { total: number, breakdown: Object }
 */
export function calculateSubnetHealthScore(subnet) {
    // D - Decentralization Score
    const giniScore = (100 - subnet.gini_stake * 100) * 0.4;
    const cvsScore = (subnet.total_wallets > 0 ?
        Math.min(100, (subnet.wallets_51 / subnet.total_wallets) * 1000) : 0) * 0.35;
    const wdrScore = (100 - subnet.top1_share * 100) * 0.25;
    const decentralization = giniScore + cvsScore + wdrScore;

    // P - Performance Score
    const praScore = (subnet.successRate || 95) * 0.4;
    const terScore = Math.min(100, (subnet.uidUtilization / 100) * 100) * 0.3;
    const oqiScore = (subnet.trust_avg || 0.9) * 100 * 0.3;
    const performance = praScore + terScore + oqiScore;

    // E - Economic Score
    const eerScore = Math.min(100, (subnet.dailyEmission / 600) * 100) * 0.3;
    const atpmScore = Math.min(100, (subnet.recycleCost / 5) * 100) * 0.25;
    const ldsScore = Math.min(100, (subnet.totalStake / 4000) * 100) * 0.25;
    const sypScore = Math.min(100, (subnet.emissionShare / 3) * 100) * 0.2;
    const economic = eerScore + atpmScore + ldsScore + sypScore;

    // A - Activity Score
    const participantGrowth = subnet.weeklyActiveMiners > 100 ? 100 : (subnet.weeklyActiveMiners / 100) * 100;
    const validatorActivity = (subnet.validatorCount / 64) * 100;
    const activity = (participantGrowth * 0.5 + validatorActivity * 0.5);

    // S - Security Score
    const aciScore = (subnet.validator_trust_avg || 0.9) * 100 * 0.4;
    const vdiScore = (1 - (subnet.hhi_validators || 0.15)) * 100 * 0.35;
    const tamScore = (subnet.securityAudit ? 100 : 0) * 0.25;
    const security = aciScore + vdiScore + tamScore;

    const total = Math.round(
        decentralization * 0.20 +
        performance * 0.25 +
        economic * 0.25 +
        activity * 0.15 +
        security * 0.15
    );

    return {
        total: Math.min(100, Math.max(0, total)),
        breakdown: {
            decentralization: Math.round(decentralization),
            performance: Math.round(performance),
            economic: Math.round(economic),
            activity: Math.round(activity),
            security: Math.round(security)
        }
    };
}

/**
 * 2. EMISSION YIELD SCORE (EYS) Calculator
 * Formula: EYS = (Annual_Emissions × TAO_Price) / Alpha_Market_Cap
 * 
 * @param {Object} subnet - Subnet data
 * @param {number} taoPrice - Current TAO price in USD
 * @returns {Object} { score: number, signal: string, interpretation: string }
 */
export function calculateEmissionYieldScore(subnet, taoPrice = 283.63) {
    const alphaPrice = subnet.taoInPool / subnet.alphaInPool;
    const marketCap = alphaPrice * subnet.circulatingSupply;
    const annualEmissions = subnet.dailyEmission * 365;

    const eys = annualEmissions / marketCap;

    let signal, interpretation;
    if (eys > 1.5) {
        signal = 'UNDERVALUED';
        interpretation = 'Strong buy signal - High emission yield';
    } else if (eys >= 0.8) {
        signal = 'FAIR VALUE';
        interpretation = 'Hold - Balanced yield';
    } else {
        signal = 'OVERVALUED';
        interpretation = 'Consider reducing - Low yield';
    }

    return {
        score: eys,
        signal,
        interpretation,
        annualYield: (eys * 100).toFixed(2) + '%'
    };
}

/**
 * 3. NET FLOW MOMENTUM INDEX (NFMI) Calculator
 * Formula: NFMI = EMA(net_flow, 30d) / EMA(net_flow, 86.8d)
 * 
 * @param {Object} subnet - Subnet data with net flow EMAs
 * @returns {Object} { index: number, signal: string, interpretation: string }
 */
export function calculateNFMI(subnet) {
    const ema30 = subnet.net_flow_30d || 0;
    const ema86 = subnet.net_flow_86d || 0;

    const nfmi = ema86 !== 0 ? ema30 / ema86 : 1.0;

    let signal, interpretation;
    if (nfmi > 1.2) {
        signal = 'BULLISH';
        interpretation = 'Strong positive momentum';
    } else if (nfmi >= 0.8) {
        signal = 'NEUTRAL';
        interpretation = 'Consolidating';
    } else {
        signal = 'BEARISH';
        interpretation = 'Negative momentum';
    }

    return {
        index: nfmi,
        signal,
        interpretation,
        ema30,
        ema86
    };
}

/**
 * 4. FAIR VALUE Calculator (DCF-Based)
 * Formula: FV = Σ[E_t × α_share × P_tao / (1+r)^t] + Terminal_Value
 * 
 * @param {Object} subnet - Subnet data
 * @param {number} taoPrice - Current TAO price
 * @param {number} discountRate - Discount rate (default 0.25)
 * @param {number} growthRate - Annual growth rate (default 0.05)
 * @param {number} years - Projection years (default 5)
 * @returns {Object} { fairValue: number, currentValue: number, ratio: number, status: string }
 */
export function calculateFairValue(subnet, taoPrice = 283.63, discountRate = 0.25, growthRate = 0.05, years = 5) {
    const alphaPrice = subnet.taoInPool / subnet.alphaInPool;
    const currentValue = alphaPrice * subnet.circulatingSupply;

    let presentValue = 0;
    let annualEmission = subnet.dailyEmission * 365;

    // Calculate present value of future emissions
    for (let t = 1; t <= years; t++) {
        const emissionValue = annualEmission * (subnet.emissionShare / 100);
        presentValue += emissionValue / Math.pow(1 + discountRate, t);
        annualEmission *= (1 + growthRate);
    }

    // Terminal value (perpetuity growth model)
    const terminalEmission = annualEmission * (subnet.emissionShare / 100);
    const terminalValue = terminalEmission / (discountRate - growthRate);
    const discountedTerminal = terminalValue / Math.pow(1 + discountRate, years);

    const fairValue = presentValue + discountedTerminal;
    const ratio = currentValue / fairValue;

    let status;
    if (ratio < 0.8) {
        status = 'Significantly Undervalued';
    } else if (ratio < 1.0) {
        status = 'Undervalued';
    } else if (ratio <= 1.2) {
        status = 'Fair Value';
    } else if (ratio <= 1.5) {
        status = 'Overvalued';
    } else {
        status = 'Significantly Overvalued';
    }

    return {
        fairValue: fairValue,
        currentValue: currentValue,
        ratio: ratio,
        status,
        upside: ((fairValue - currentValue) / currentValue * 100).toFixed(2) + '%'
    };
}

/**
 * 5. COALITION VULNERABILITY SCORE (CVS) Calculator
 * Formula: CVS = 100 × (Wallets_for_51% / Total_Wallets)
 * 
 * @param {Object} subnet - Subnet data
 * @returns {Object} { score: number, riskLevel: string, interpretation: string }
 */
export function calculateCVS(subnet) {
    const cvs = (subnet.wallets_51 / subnet.total_wallets) * 100;

    let riskLevel, interpretation;
    if (cvs > 10) {
        riskLevel = 'LOW RISK';
        interpretation = 'Highly decentralized';
    } else if (cvs >= 5) {
        riskLevel = 'MEDIUM RISK';
        interpretation = 'Acceptable decentralization';
    } else if (cvs >= 2) {
        riskLevel = 'HIGH RISK';
        interpretation = 'Concentrated ownership';
    } else {
        riskLevel = 'CRITICAL RISK';
        interpretation = 'Easily compromised';
    }

    return {
        score: cvs,
        riskLevel,
        interpretation,
        walletsFor51: subnet.wallets_51,
        totalWallets: subnet.total_wallets
    };
}

/**
 * 6. POSITION SIZING Calculator
 * Formula: Position = Portfolio × min(Kelly_Fraction × 0.25, Risk_Tolerance)
 * 
 * @param {Object} subnet - Subnet data
 * @param {number} portfolioSize - Total portfolio size in TAO
 * @param {number} riskTolerance - Max position size as decimal (default 0.10 = 10%)
 * @returns {Object} { positionSize: number, percentage: number, kellyFraction: number }
 */
export function calculatePositionSize(subnet, portfolioSize = 100, riskTolerance = 0.10) {
    // Calculate win probability from health score
    const healthScore = calculateSubnetHealthScore(subnet);
    const winProb = healthScore.total / 100;
    const lossProb = 1 - winProb;

    // Estimate win/loss ratio from valuation metrics
    const alphaPrice = subnet.taoInPool / subnet.alphaInPool;
    const marketCap = alphaPrice * subnet.circulatingSupply;
    const peRatio = marketCap / subnet.dailyEmission;

    // Win/loss ratio based on valuation
    const winLossRatio = peRatio < 0.25 ? 2.5 : peRatio < 0.40 ? 1.5 : 1.0;

    // Kelly Criterion
    const kellyFraction = (winProb * winLossRatio - lossProb) / winLossRatio;

    // Conservative Kelly (25% of full Kelly)
    const conservativeKelly = Math.max(0, kellyFraction * 0.25);

    // Apply risk tolerance cap
    const positionPercentage = Math.min(conservativeKelly, riskTolerance);
    const positionSize = portfolioSize * positionPercentage;

    return {
        positionSize: positionSize,
        percentage: (positionPercentage * 100).toFixed(2) + '%',
        kellyFraction: kellyFraction,
        recommendation: positionPercentage > 0.05 ? 'Significant Position' :
            positionPercentage > 0.02 ? 'Moderate Position' : 'Small Position'
    };
}

/**
 * 7. RISK-ADJUSTED RETURN Calculator
 * Formula: RAR = (Expected_APR - Risk_Free) / (1 + Combined_Risk × 2)
 * 
 * @param {Object} subnet - Subnet data
 * @param {number} riskFreeRate - Risk-free rate (default 0.05 = 5%)
 * @returns {Object} { rar: number, expectedAPR: number, combinedRisk: number }
 */
export function calculateRiskAdjustedReturn(subnet, riskFreeRate = 0.05) {
    // Calculate expected APR from emissions
    const alphaPrice = subnet.taoInPool / subnet.alphaInPool;
    const marketCap = alphaPrice * subnet.circulatingSupply;
    const annualEmissions = subnet.dailyEmission * 365;
    const expectedAPR = annualEmissions / marketCap;

    // Calculate risk components
    const volatilityRisk = subnet.priceMomentum ? Math.abs(subnet.priceMomentum) / 100 : 0.15;
    const securityRisk = subnet.securityAudit ? 0.05 : 0.20;
    const decentRisk = subnet.gini_stake || 0.15;

    const combinedRisk = (volatilityRisk + securityRisk + decentRisk) / 3;

    // Risk-adjusted return
    const rar = (expectedAPR - riskFreeRate) / (1 + combinedRisk * 2);

    return {
        rar: (rar * 100).toFixed(2) + '%',
        expectedAPR: (expectedAPR * 100).toFixed(2) + '%',
        combinedRisk: (combinedRisk * 100).toFixed(2) + '%',
        sharpeRatio: (rar / combinedRisk).toFixed(2)
    };
}

/**
 * Calculate all metrics for a subnet
 * @param {Object} subnet - Subnet data
 * @param {number} taoPrice - Current TAO price
 * @returns {Object} All calculated metrics
 */
export function calculateAllMetrics(subnet, taoPrice = 283.63) {
    return {
        healthScore: calculateSubnetHealthScore(subnet),
        emissionYield: calculateEmissionYieldScore(subnet, taoPrice),
        nfmi: calculateNFMI(subnet),
        fairValue: calculateFairValue(subnet, taoPrice),
        cvs: calculateCVS(subnet),
        positionSize: calculatePositionSize(subnet),
        riskAdjustedReturn: calculateRiskAdjustedReturn(subnet)
    };
}

/**
 * Helper: Calculate percentile rank for a metric across all subnets
 * @param {Array} subnets - Array of all subnets
 * @param {number} value - Value to rank
 * @param {Function} metricFn - Function to extract metric from subnet
 * @returns {number} Percentile (0-100)
 */
export function calculatePercentile(subnets, value, metricFn) {
    const values = subnets.map(metricFn).sort((a, b) => a - b);
    const index = values.findIndex(v => v >= value);
    return Math.round((index / values.length) * 100);
}
