/**
 * Mock Data Enhancer for Bittensor Scoring Calculators
 * Adds required fields for SHS, NFMI, CVS calculations
 */

/**
 * Enhance subnet data with additional fields needed for advanced calculators
 * @param {Object} subnet - Base subnet data
 * @returns {Object} Enhanced subnet data
 */
export function enhanceSubnetData(subnet) {
    // Calculate derived values based on existing data
    const alphaPrice = subnet.taoInPool / subnet.alphaInPool;
    const marketCap = alphaPrice * subnet.circulatingSupply;

    // Generate realistic mock data for missing fields
    const gini_stake = 0.75 + (Math.random() * 0.20); // 0.75-0.95
    const top1_share = 0.30 + (Math.random() * 0.30); // 0.30-0.60

    // Calculate wallets based on stake concentration
    const total_wallets = Math.floor(subnet.weeklyActiveMiners * 1.5);
    const wallets_51 = Math.max(2, Math.floor(total_wallets * (gini_stake / 10)));

    // NFMI data (net flow EMAs)
    const baseFlow = subnet.netFlow === 'positive' ? 20 + Math.random() * 30 :
        subnet.netFlow === 'neutral' ? -5 + Math.random() * 10 :
            -30 + Math.random() * 20;
    const net_flow_30d = baseFlow;
    const net_flow_86d = baseFlow * (0.8 + Math.random() * 0.4);

    // Validator metrics
    const active_validators = subnet.validatorCount;
    const total_validators = 64;
    const hhi_validators = 0.08 + (Math.random() * 0.12); // 0.08-0.20

    // Trust scores
    const trust_avg = 0.85 + (Math.random() * 0.12); // 0.85-0.97
    const validator_trust_avg = trust_avg + 0.02;

    return {
        ...subnet,
        // Decentralization metrics
        gini_stake,
        top1_share,
        wallets_51,
        total_wallets,
        hhi_validators,

        // Trust metrics
        trust_avg,
        validator_trust_avg,

        // NFMI metrics
        net_flow_30d,
        net_flow_86d,

        // Validator metrics
        active_validators,
        total_validators
    };
}

/**
 * Enhance all subnets in an array
 * @param {Array} subnets - Array of subnet data
 * @returns {Array} Enhanced subnets
 */
export function enhanceAllSubnets(subnets) {
    return subnets.map(enhanceSubnetData);
}
