// Staking strategies data
export const platformStats = {
  totalAUM: "$2,153,070",
  aumGrowth: "+51.00%",
  totalNominators: "2,232",
  topAPY: "183.88%"
};

export const strategies = [
  // Market Cap Weighted Strategies
  {
    category: "Market Cap Weighted",
    name: "Top 15",
    description: "Top 15 subnets by market cap",
    apy: "48.79",
    features: ["Elite Performance Focus", "S&P 100 Style", "Proven Winners"],
    subnets: 0
  },
  {
    category: "Market Cap Weighted",
    name: "Top 10",
    description: "Top 10 subnets by market cap",
    apy: "47.99",
    features: ["Broad diversification", "Market-cap weighted"],
    subnets: 0
  },
  {
    category: "Market Cap Weighted",
    name: "Top 5",
    description: "Top 5 Subnets by Market Cap",
    apy: "47.03",
    features: ["Top performers", "High growth", "Concentrated"],
    subnets: 0
  },
  
  // Fundamental & Diversified Curated Strategies
  {
    category: "Fundamental & Diversified",
    name: "Universe",
    description: "Complete Ecosystem Exposure",
    apy: "50.78",
    features: ["S&P 500 Style", "Complete Diversification", "Professional Curation"],
    subnets: 0
  },
  {
    category: "Fundamental & Diversified",
    name: "Full Stack",
    description: "Complete AI Development Stack Exposure",
    apy: "49.90",
    features: ["Complete stack coverage", "Data to application layer"],
    subnets: 0
  },
  {
    category: "Fundamental & Diversified",
    name: "Dougs Picks",
    description: "Full Stack Diversified Index",
    apy: "48.85",
    features: ["Diversified", "Broad exposure", "Balanced"],
    subnets: 0
  },
  {
    category: "Fundamental & Diversified",
    name: "TSBCSI",
    description: "TrustedStake Blue Chip Subnet Index",
    apy: "43.98",
    features: ["Full subnet exposure", "Active rebalancing"],
    subnets: 0
  },
  
  // Thematic & Sector Focused Strategies
  {
    category: "Thematic & Sector",
    name: "Fintech",
    description: "Trading, Yield & Liquidity Index",
    apy: "49.02",
    features: ["Financial Innovation", "Trading Infrastructure", "DeFi and Yield"],
    subnets: 0
  },
  {
    category: "Thematic & Sector",
    name: "Covenant",
    description: "Covenant Index",
    apy: "49.15",
    features: ["Distributed Training", "Trustless verification"],
    subnets: 0
  },
  {
    category: "Thematic & Sector",
    name: "Macrocosmos",
    description: "Macrocosmos Index",
    apy: "58.24",
    features: ["Infrastructure focused", "Proven team selection"],
    subnets: 0
  },
  
  // Defensive & Conservative Strategies
  {
    category: "Defensive & Conservative",
    name: "Risk Averse (Risk Free)",
    description: "Risk-free exposure with root dividends reinvested",
    apy: "7.96",
    features: ["Dividend reinvestment", "Defensive Foundation", "Smart Compounding"],
    subnets: 0
  }
];

// Group strategies by category
export const groupedStrategies = strategies.reduce((acc, strategy) => {
  if (!acc[strategy.category]) {
    acc[strategy.category] = [];
  }
  acc[strategy.category].push(strategy);
  return acc;
}, {});
