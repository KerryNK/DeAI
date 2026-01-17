import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, DollarSign, Code, Shield, Activity, TrendingUp, TrendingDown, Filter, ArrowUpDown, Info, Zap, Users, BarChart3, Gauge, AlertTriangle, ThumbsUp, Scale } from 'lucide-react';

const DeAISubnetDashboard = () => {
  const [expandedSubnet, setExpandedSubnet] = useState(null);
  const [currencyMode, setCurrencyMode] = useState('usd');
  const [sortBy, setSortBy] = useState('compositeScore');
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [showMethodology, setShowMethodology] = useState(false);
  const [taoPrice] = useState(283.63);

  const subnets = [
    // Top tier subnets (high emission, established)
    { id: 1, name: "Apex", description: "Text prompting and LLM generation", dailyEmission: 542.3, taoInPool: 82.5, alphaInPool: 1650, circulatingSupply: 3200, recycleCost: 3.8, totalStake: 3420, validatorCount: 72, uidUtilization: 98, emissionShare: 2.8, priceMomentum: 12.5, emissionTrend: 8.3, netFlow: "positive", age: 16, validatorDiversity: 0.54, githubCommits: 234, githubContributors: 12, testCoverage: 78, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 156, successRate: 99.2 },
    { id: 8, name: "Taoshi", description: "Financial predictions and trading signals", dailyEmission: 498.7, taoInPool: 76.4, alphaInPool: 1820, circulatingSupply: 2950, recycleCost: 3.5, totalStake: 2960, validatorCount: 68, uidUtilization: 100, emissionShare: 2.6, priceMomentum: 18.2, emissionTrend: 11.5, netFlow: "positive", age: 14, validatorDiversity: 0.58, githubCommits: 189, githubContributors: 9, testCoverage: 72, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 142, successRate: 98.7 },
    { id: 19, name: "Vision", description: "Computer vision and image analysis", dailyEmission: 490.2, taoInPool: 68.3, alphaInPool: 1580, circulatingSupply: 2780, recycleCost: 3.2, totalStake: 2580, validatorCount: 64, uidUtilization: 96, emissionShare: 2.4, priceMomentum: 15.7, emissionTrend: 9.8, netFlow: "positive", age: 12, validatorDiversity: 0.61, githubCommits: 156, githubContributors: 8, testCoverage: 68, securityAudit: true, lastCommit: 3, weeklyActiveMiners: 128, successRate: 97.5 },
    { id: 4, name: "Targon", description: "Multi-modality model validation", dailyEmission: 465.8, taoInPool: 64.7, alphaInPool: 1720, circulatingSupply: 2600, recycleCost: 3.1, totalStake: 2450, validatorCount: 62, uidUtilization: 94, emissionShare: 2.3, priceMomentum: 10.2, emissionTrend: 7.4, netFlow: "positive", age: 15, validatorDiversity: 0.59, githubCommits: 178, githubContributors: 10, testCoverage: 70, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 118, successRate: 98.9 },
    { id: 9, name: "Pretraining", description: "Decentralized model pretraining", dailyEmission: 478.5, taoInPool: 71.2, alphaInPool: 1890, circulatingSupply: 2720, recycleCost: 3.3, totalStake: 2780, validatorCount: 65, uidUtilization: 97, emissionShare: 2.5, priceMomentum: 14.3, emissionTrend: 10.2, netFlow: "positive", age: 13, validatorDiversity: 0.56, githubCommits: 201, githubContributors: 11, testCoverage: 74, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 134, successRate: 98.4 },
    { id: 18, name: "Cortex.t", description: "Reasoning and question answering", dailyEmission: 356.8, taoInPool: 42.3, alphaInPool: 1350, circulatingSupply: 1980, recycleCost: 2.2, totalStake: 1980, validatorCount: 48, uidUtilization: 84, emissionShare: 1.7, priceMomentum: 6.8, emissionTrend: 3.5, netFlow: "positive", age: 11, validatorDiversity: 0.68, githubCommits: 115, githubContributors: 5, testCoverage: 58, securityAudit: true, lastCommit: 6, weeklyActiveMiners: 72, successRate: 95.8 },
    // Mid tier subnets
    { id: 21, name: "Filetao", description: "Decentralized file storage network", dailyEmission: 425.6, taoInPool: 54.2, alphaInPool: 1420, circulatingSupply: 2350, recycleCost: 2.8, totalStake: 2280, validatorCount: 58, uidUtilization: 92, emissionShare: 2.1, priceMomentum: 8.5, emissionTrend: 5.2, netFlow: "neutral", age: 10, validatorDiversity: 0.63, githubCommits: 142, githubContributors: 7, testCoverage: 65, securityAudit: true, lastCommit: 4, weeklyActiveMiners: 98, successRate: 99.8 },
    { id: 3, name: "MyShell", description: "Voice AI and text-to-speech synthesis", dailyEmission: 387.4, taoInPool: 48.7, alphaInPool: 1680, circulatingSupply: 2200, recycleCost: 2.5, totalStake: 2140, validatorCount: 52, uidUtilization: 88, emissionShare: 1.9, priceMomentum: -3.2, emissionTrend: 2.1, netFlow: "neutral", age: 15, validatorDiversity: 0.66, githubCommits: 128, githubContributors: 6, testCoverage: 61, securityAudit: true, lastCommit: 5, weeklyActiveMiners: 86, successRate: 96.2 },
    { id: 13, name: "Dataverse", description: "Decentralized data marketplace", dailyEmission: 324.5, taoInPool: 38.6, alphaInPool: 1180, circulatingSupply: 1820, recycleCost: 1.9, totalStake: 1820, validatorCount: 44, uidUtilization: 80, emissionShare: 1.6, priceMomentum: 11.3, emissionTrend: 7.8, netFlow: "positive", age: 9, validatorDiversity: 0.71, githubCommits: 98, githubContributors: 4, testCoverage: 54, securityAudit: false, lastCommit: 7, weeklyActiveMiners: 64, successRate: 94.5 },
    { id: 5, name: "OpenKaito", description: "Web3 search and discovery engine", dailyEmission: 412.3, taoInPool: 52.8, alphaInPool: 1560, circulatingSupply: 2180, recycleCost: 2.6, totalStake: 2120, validatorCount: 54, uidUtilization: 89, emissionShare: 2.0, priceMomentum: 9.7, emissionTrend: 6.1, netFlow: "positive", age: 14, validatorDiversity: 0.62, githubCommits: 167, githubContributors: 8, testCoverage: 66, securityAudit: true, lastCommit: 3, weeklyActiveMiners: 94, successRate: 97.1 },
    { id: 6, name: "Nous", description: "Fine-tuning and model adaptation", dailyEmission: 398.6, taoInPool: 58.4, alphaInPool: 2100, circulatingSupply: 2450, recycleCost: 2.4, totalStake: 2050, validatorCount: 50, uidUtilization: 86, emissionShare: 1.8, priceMomentum: 5.4, emissionTrend: 4.2, netFlow: "neutral", age: 13, validatorDiversity: 0.64, githubCommits: 134, githubContributors: 7, testCoverage: 62, securityAudit: true, lastCommit: 4, weeklyActiveMiners: 82, successRate: 96.8 },
    { id: 11, name: "Transcription", description: "Audio transcription and speech recognition", dailyEmission: 345.2, taoInPool: 35.8, alphaInPool: 1280, circulatingSupply: 1750, recycleCost: 2.0, totalStake: 1760, validatorCount: 42, uidUtilization: 82, emissionShare: 1.5, priceMomentum: 7.2, emissionTrend: 4.8, netFlow: "positive", age: 12, validatorDiversity: 0.69, githubCommits: 108, githubContributors: 5, testCoverage: 56, securityAudit: true, lastCommit: 5, weeklyActiveMiners: 68, successRate: 95.2 },
    { id: 17, name: "Pali", description: "Text-to-3D model generation", dailyEmission: 312.8, taoInPool: 28.4, alphaInPool: 980, circulatingSupply: 1620, recycleCost: 1.8, totalStake: 1650, validatorCount: 40, uidUtilization: 78, emissionShare: 1.4, priceMomentum: 22.5, emissionTrend: 12.3, netFlow: "positive", age: 8, validatorDiversity: 0.72, githubCommits: 145, githubContributors: 6, testCoverage: 52, securityAudit: false, lastCommit: 2, weeklyActiveMiners: 58, successRate: 93.8 },
    { id: 20, name: "BitAgent", description: "Autonomous AI agent framework", dailyEmission: 378.4, taoInPool: 62.5, alphaInPool: 2450, circulatingSupply: 2680, recycleCost: 2.3, totalStake: 1920, validatorCount: 46, uidUtilization: 85, emissionShare: 1.7, priceMomentum: -1.8, emissionTrend: 1.5, netFlow: "neutral", age: 9, validatorDiversity: 0.67, githubCommits: 122, githubContributors: 6, testCoverage: 59, securityAudit: true, lastCommit: 6, weeklyActiveMiners: 76, successRate: 96.5 },
    { id: 22, name: "Meta Search", description: "Distributed web search engine", dailyEmission: 334.7, taoInPool: 31.2, alphaInPool: 1120, circulatingSupply: 1680, recycleCost: 1.9, totalStake: 1580, validatorCount: 38, uidUtilization: 76, emissionShare: 1.4, priceMomentum: 4.5, emissionTrend: 2.8, netFlow: "neutral", age: 10, validatorDiversity: 0.73, githubCommits: 89, githubContributors: 4, testCoverage: 48, securityAudit: false, lastCommit: 8, weeklyActiveMiners: 52, successRate: 94.2 },
    { id: 23, name: "NicheImage", description: "Specialized image generation models", dailyEmission: 298.5, taoInPool: 45.6, alphaInPool: 2280, circulatingSupply: 2520, recycleCost: 1.7, totalStake: 1480, validatorCount: 36, uidUtilization: 74, emissionShare: 1.3, priceMomentum: -5.2, emissionTrend: -1.4, netFlow: "negative", age: 11, validatorDiversity: 0.74, githubCommits: 76, githubContributors: 3, testCoverage: 44, securityAudit: false, lastCommit: 12, weeklyActiveMiners: 48, successRate: 92.8 },
    // Lower tier / emerging subnets
    { id: 24, name: "Omega", description: "Multi-modal content understanding", dailyEmission: 285.3, taoInPool: 24.8, alphaInPool: 920, circulatingSupply: 1420, recycleCost: 1.6, totalStake: 1380, validatorCount: 34, uidUtilization: 72, emissionShare: 1.2, priceMomentum: 15.8, emissionTrend: 9.4, netFlow: "positive", age: 7, validatorDiversity: 0.75, githubCommits: 156, githubContributors: 7, testCoverage: 58, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 54, successRate: 94.5 },
    { id: 25, name: "Hivemind", description: "Distributed compute orchestration", dailyEmission: 268.9, taoInPool: 22.4, alphaInPool: 780, circulatingSupply: 1280, recycleCost: 1.5, totalStake: 1290, validatorCount: 32, uidUtilization: 70, emissionShare: 1.1, priceMomentum: 8.9, emissionTrend: 5.6, netFlow: "positive", age: 6, validatorDiversity: 0.76, githubCommits: 134, githubContributors: 6, testCoverage: 54, securityAudit: true, lastCommit: 3, weeklyActiveMiners: 46, successRate: 93.2 },
    { id: 27, name: "Compute", description: "GPU compute marketplace", dailyEmission: 342.6, taoInPool: 48.2, alphaInPool: 1850, circulatingSupply: 2180, recycleCost: 2.1, totalStake: 1720, validatorCount: 44, uidUtilization: 83, emissionShare: 1.6, priceMomentum: 3.2, emissionTrend: 2.1, netFlow: "neutral", age: 10, validatorDiversity: 0.68, githubCommits: 112, githubContributors: 5, testCoverage: 52, securityAudit: true, lastCommit: 5, weeklyActiveMiners: 62, successRate: 95.8 },
    { id: 28, name: "Foundry", description: "Smart contract AI auditing", dailyEmission: 256.4, taoInPool: 19.8, alphaInPool: 680, circulatingSupply: 1150, recycleCost: 1.4, totalStake: 1180, validatorCount: 30, uidUtilization: 68, emissionShare: 1.0, priceMomentum: 28.4, emissionTrend: 15.2, netFlow: "positive", age: 5, validatorDiversity: 0.78, githubCommits: 178, githubContributors: 8, testCoverage: 72, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 42, successRate: 97.2 },
    { id: 29, name: "Coldint", description: "Cold storage intelligence network", dailyEmission: 234.8, taoInPool: 16.5, alphaInPool: 620, circulatingSupply: 980, recycleCost: 1.3, totalStake: 1050, validatorCount: 28, uidUtilization: 65, emissionShare: 0.9, priceMomentum: -8.4, emissionTrend: -2.8, netFlow: "negative", age: 8, validatorDiversity: 0.79, githubCommits: 54, githubContributors: 2, testCoverage: 38, securityAudit: false, lastCommit: 18, weeklyActiveMiners: 34, successRate: 91.5 },
    { id: 31, name: "NASChain", description: "Neural architecture search network", dailyEmission: 278.6, taoInPool: 32.4, alphaInPool: 1480, circulatingSupply: 1720, recycleCost: 1.6, totalStake: 1340, validatorCount: 34, uidUtilization: 71, emissionShare: 1.2, priceMomentum: 6.7, emissionTrend: 4.2, netFlow: "positive", age: 7, validatorDiversity: 0.74, githubCommits: 98, githubContributors: 4, testCoverage: 48, securityAudit: false, lastCommit: 6, weeklyActiveMiners: 48, successRate: 93.8 },
    { id: 32, name: "ITS", description: "Intent-based transaction system", dailyEmission: 245.2, taoInPool: 14.8, alphaInPool: 520, circulatingSupply: 920, recycleCost: 1.3, totalStake: 980, validatorCount: 26, uidUtilization: 62, emissionShare: 0.9, priceMomentum: 45.2, emissionTrend: 22.8, netFlow: "positive", age: 4, validatorDiversity: 0.81, githubCommits: 212, githubContributors: 9, testCoverage: 68, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 38, successRate: 96.4 },
    { id: 33, name: "ReadyAI", description: "Production-ready AI deployment", dailyEmission: 312.4, taoInPool: 38.6, alphaInPool: 1620, circulatingSupply: 1950, recycleCost: 1.8, totalStake: 1560, validatorCount: 38, uidUtilization: 77, emissionShare: 1.4, priceMomentum: 2.1, emissionTrend: 1.2, netFlow: "neutral", age: 9, validatorDiversity: 0.71, githubCommits: 87, githubContributors: 4, testCoverage: 46, securityAudit: true, lastCommit: 7, weeklyActiveMiners: 56, successRate: 94.8 },
    { id: 34, name: "Dippy", description: "Conversational AI companions", dailyEmission: 289.7, taoInPool: 42.8, alphaInPool: 2150, circulatingSupply: 2380, recycleCost: 1.7, totalStake: 1420, validatorCount: 36, uidUtilization: 73, emissionShare: 1.3, priceMomentum: -2.4, emissionTrend: 0.8, netFlow: "neutral", age: 8, validatorDiversity: 0.73, githubCommits: 94, githubContributors: 5, testCoverage: 50, securityAudit: false, lastCommit: 8, weeklyActiveMiners: 52, successRate: 93.5 },
    { id: 35, name: "LogicNet", description: "Logical reasoning and inference", dailyEmission: 267.3, taoInPool: 21.6, alphaInPool: 840, circulatingSupply: 1180, recycleCost: 1.5, totalStake: 1220, validatorCount: 30, uidUtilization: 67, emissionShare: 1.1, priceMomentum: 12.4, emissionTrend: 7.8, netFlow: "positive", age: 6, validatorDiversity: 0.77, githubCommits: 142, githubContributors: 6, testCoverage: 62, securityAudit: true, lastCommit: 3, weeklyActiveMiners: 44, successRate: 95.2 },
    { id: 36, name: "Alchemy", description: "AI-powered DeFi strategies", dailyEmission: 298.4, taoInPool: 56.2, alphaInPool: 2680, circulatingSupply: 2850, recycleCost: 1.7, totalStake: 1480, validatorCount: 38, uidUtilization: 75, emissionShare: 1.3, priceMomentum: -6.8, emissionTrend: -2.1, netFlow: "negative", age: 10, validatorDiversity: 0.72, githubCommits: 68, githubContributors: 3, testCoverage: 42, securityAudit: false, lastCommit: 14, weeklyActiveMiners: 46, successRate: 92.4 },
    { id: 37, name: "Synth", description: "Synthetic data generation", dailyEmission: 324.8, taoInPool: 28.4, alphaInPool: 980, circulatingSupply: 1480, recycleCost: 1.9, totalStake: 1540, validatorCount: 40, uidUtilization: 79, emissionShare: 1.5, priceMomentum: 18.6, emissionTrend: 11.2, netFlow: "positive", age: 6, validatorDiversity: 0.70, githubCommits: 168, githubContributors: 7, testCoverage: 58, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 58, successRate: 96.1 },
    { id: 38, name: "Tatsu", description: "Game AI and NPC intelligence", dailyEmission: 256.8, taoInPool: 18.2, alphaInPool: 720, circulatingSupply: 1080, recycleCost: 1.4, totalStake: 1120, validatorCount: 28, uidUtilization: 64, emissionShare: 1.0, priceMomentum: 32.4, emissionTrend: 18.6, netFlow: "positive", age: 4, validatorDiversity: 0.80, githubCommits: 198, githubContributors: 8, testCoverage: 64, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 40, successRate: 95.8 },
    { id: 39, name: "EdgeAI", description: "Edge device model optimization", dailyEmission: 234.5, taoInPool: 15.8, alphaInPool: 680, circulatingSupply: 980, recycleCost: 1.3, totalStake: 1020, validatorCount: 26, uidUtilization: 61, emissionShare: 0.9, priceMomentum: 5.8, emissionTrend: 3.2, netFlow: "neutral", age: 7, validatorDiversity: 0.79, githubCommits: 86, githubContributors: 4, testCoverage: 46, securityAudit: false, lastCommit: 9, weeklyActiveMiners: 36, successRate: 93.2 },
    { id: 40, name: "Nimbus", description: "Distributed inference cloud", dailyEmission: 278.9, taoInPool: 24.6, alphaInPool: 1020, circulatingSupply: 1380, recycleCost: 1.6, totalStake: 1280, validatorCount: 32, uidUtilization: 69, emissionShare: 1.2, priceMomentum: 9.4, emissionTrend: 5.8, netFlow: "positive", age: 5, validatorDiversity: 0.76, githubCommits: 124, githubContributors: 5, testCoverage: 52, securityAudit: true, lastCommit: 4, weeklyActiveMiners: 46, successRate: 94.6 },
    { id: 41, name: "Graphite", description: "Knowledge graph construction", dailyEmission: 245.6, taoInPool: 17.2, alphaInPool: 780, circulatingSupply: 1020, recycleCost: 1.4, totalStake: 1080, validatorCount: 28, uidUtilization: 63, emissionShare: 1.0, priceMomentum: -4.2, emissionTrend: -0.8, netFlow: "negative", age: 8, validatorDiversity: 0.78, githubCommits: 72, githubContributors: 3, testCoverage: 40, securityAudit: false, lastCommit: 11, weeklyActiveMiners: 38, successRate: 92.8 },
    { id: 42, name: "Rizzo", description: "Risk analysis and modeling", dailyEmission: 312.6, taoInPool: 52.4, alphaInPool: 2420, circulatingSupply: 2680, recycleCost: 1.8, totalStake: 1520, validatorCount: 40, uidUtilization: 78, emissionShare: 1.4, priceMomentum: 1.2, emissionTrend: 0.6, netFlow: "neutral", age: 9, validatorDiversity: 0.71, githubCommits: 82, githubContributors: 4, testCoverage: 44, securityAudit: true, lastCommit: 8, weeklyActiveMiners: 54, successRate: 94.2 },
    { id: 44, name: "Score", description: "AI model benchmarking network", dailyEmission: 267.8, taoInPool: 22.8, alphaInPool: 920, circulatingSupply: 1240, recycleCost: 1.5, totalStake: 1260, validatorCount: 32, uidUtilization: 68, emissionShare: 1.1, priceMomentum: 14.6, emissionTrend: 8.4, netFlow: "positive", age: 5, validatorDiversity: 0.76, githubCommits: 156, githubContributors: 6, testCoverage: 58, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 48, successRate: 95.4 },
    { id: 45, name: "Gen42", description: "Generative code synthesis", dailyEmission: 298.2, taoInPool: 34.6, alphaInPool: 1580, circulatingSupply: 1820, recycleCost: 1.7, totalStake: 1440, validatorCount: 36, uidUtilization: 74, emissionShare: 1.3, priceMomentum: 8.2, emissionTrend: 4.6, netFlow: "positive", age: 6, validatorDiversity: 0.73, githubCommits: 134, githubContributors: 6, testCoverage: 54, securityAudit: true, lastCommit: 3, weeklyActiveMiners: 52, successRate: 94.8 },
    { id: 46, name: "Biometric", description: "Privacy-preserving biometric AI", dailyEmission: 234.2, taoInPool: 12.8, alphaInPool: 480, circulatingSupply: 820, recycleCost: 1.2, totalStake: 920, validatorCount: 24, uidUtilization: 58, emissionShare: 0.8, priceMomentum: 42.8, emissionTrend: 24.6, netFlow: "positive", age: 3, validatorDiversity: 0.82, githubCommits: 224, githubContributors: 10, testCoverage: 74, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 32, successRate: 97.6 },
    { id: 47, name: "DocuMind", description: "Document understanding and extraction", dailyEmission: 256.4, taoInPool: 18.6, alphaInPool: 820, circulatingSupply: 1120, recycleCost: 1.4, totalStake: 1140, validatorCount: 30, uidUtilization: 66, emissionShare: 1.0, priceMomentum: 6.4, emissionTrend: 3.8, netFlow: "neutral", age: 7, validatorDiversity: 0.77, githubCommits: 102, githubContributors: 5, testCoverage: 50, securityAudit: false, lastCommit: 6, weeklyActiveMiners: 42, successRate: 94.2 },
    { id: 48, name: "Sentinel", description: "AI security threat detection", dailyEmission: 278.5, taoInPool: 26.4, alphaInPool: 1180, circulatingSupply: 1420, recycleCost: 1.6, totalStake: 1320, validatorCount: 34, uidUtilization: 70, emissionShare: 1.2, priceMomentum: 11.8, emissionTrend: 6.4, netFlow: "positive", age: 5, validatorDiversity: 0.75, githubCommits: 146, githubContributors: 7, testCoverage: 68, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 48, successRate: 96.8 },
    { id: 49, name: "ChainML", description: "On-chain machine learning", dailyEmission: 245.8, taoInPool: 14.2, alphaInPool: 580, circulatingSupply: 920, recycleCost: 1.3, totalStake: 1020, validatorCount: 26, uidUtilization: 62, emissionShare: 0.9, priceMomentum: -12.4, emissionTrend: -4.8, netFlow: "negative", age: 6, validatorDiversity: 0.80, githubCommits: 64, githubContributors: 3, testCoverage: 36, securityAudit: false, lastCommit: 16, weeklyActiveMiners: 34, successRate: 91.2 },
    { id: 50, name: "Lumina", description: "Real-time video AI processing", dailyEmission: 267.4, taoInPool: 20.8, alphaInPool: 880, circulatingSupply: 1180, recycleCost: 1.5, totalStake: 1200, validatorCount: 30, uidUtilization: 67, emissionShare: 1.1, priceMomentum: 16.2, emissionTrend: 9.8, netFlow: "positive", age: 4, validatorDiversity: 0.78, githubCommits: 168, githubContributors: 7, testCoverage: 56, securityAudit: true, lastCommit: 2, weeklyActiveMiners: 44, successRate: 95.6 },
    // Extended range subnets
    { id: 118, name: "Agent Arena", description: "Competitive AI agent benchmarking and tournaments", dailyEmission: 212.4, taoInPool: 10.2, alphaInPool: 380, circulatingSupply: 720, recycleCost: 1.2, totalStake: 840, validatorCount: 24, uidUtilization: 58, emissionShare: 0.8, priceMomentum: 52.6, emissionTrend: 34.2, netFlow: "positive", age: 3, validatorDiversity: 0.83, githubCommits: 242, githubContributors: 11, testCoverage: 76, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 32, successRate: 97.4 },
    { id: 120, name: "Templar", description: "Decentralized AI governance and coordination", dailyEmission: 198.6, taoInPool: 8.4, alphaInPool: 320, circulatingSupply: 680, recycleCost: 1.1, totalStake: 780, validatorCount: 22, uidUtilization: 54, emissionShare: 0.7, priceMomentum: 68.4, emissionTrend: 42.8, netFlow: "positive", age: 2, validatorDiversity: 0.85, githubCommits: 286, githubContributors: 14, testCoverage: 82, securityAudit: true, lastCommit: 1, weeklyActiveMiners: 28, successRate: 98.2 }
  ];

  const calculateDerivedMetrics = (subnet) => {
    const alphaPrice = subnet.taoInPool / subnet.alphaInPool;
    const marketCap = alphaPrice * subnet.circulatingSupply;
    const taoLiquidity = subnet.taoInPool * 2;
    const liquidityMcRatio = (taoLiquidity / marketCap) * 100;
    return { alphaPrice, marketCap, taoLiquidity, liquidityMcRatio };
  };

  const calculatePERatio = (subnet) => {
    const { marketCap } = calculateDerivedMetrics(subnet);
    const peRatio = marketCap / subnet.dailyEmission;
    const emissionYield = (subnet.dailyEmission / marketCap) * 100;
    const fairValueLow = 0.25, fairValueHigh = 0.40;
    
    let status, color, icon, description, score;
    if (peRatio < fairValueLow) {
      const intensity = Math.min(100, ((fairValueLow - peRatio) / fairValueLow) * 100);
      status = intensity > 50 ? "Highly Undervalued" : "Undervalued";
      color = "text-emerald-400"; icon = "undervalued";
      description = "Low price relative to emissions - high yield opportunity";
      score = Math.min(100, 70 + intensity * 0.3);
    } else if (peRatio > fairValueHigh) {
      const intensity = Math.min(100, ((peRatio - fairValueHigh) / fairValueHigh) * 100);
      status = intensity > 50 ? "Highly Speculative" : "Overbought";
      color = "text-red-400"; icon = "overbought";
      description = "High price relative to emissions - speculative premium";
      score = Math.max(20, 50 - intensity * 0.3);
    } else {
      status = "Fair Value"; color = "text-yellow-400"; icon = "fair";
      description = "Price aligned with emissions - balanced risk/reward";
      score = 60;
    }
    return { ratio: peRatio, emissionYield, status, color, icon, description, score: Math.round(score) };
  };

  const calculateDeAIScore = (subnet) => {
    const normalize = (v, min, max) => Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100));
    const derived = calculateDerivedMetrics(subnet);
    const economic = (normalize(subnet.dailyEmission, 300, 600) * 0.3 + normalize(derived.alphaPrice, 0.02, 0.06) * 0.25 + normalize(derived.marketCap, 50, 200) * 0.25 + normalize(subnet.recycleCost, 1.5, 4.5) * 0.2);
    const network = (normalize(subnet.totalStake, 1500, 4000) * 0.3 + normalize(subnet.validatorCount, 40, 80) * 0.25 + normalize(subnet.uidUtilization, 75, 100) * 0.25 + normalize(subnet.weeklyActiveMiners, 50, 200) * 0.2);
    const liquidity = (normalize(derived.taoLiquidity, 70, 180) * 0.4 + normalize(subnet.emissionShare, 1.5, 3.5) * 0.35 + normalize(derived.liquidityMcRatio, 40, 80) * 0.25);
    const momentum = (normalize(subnet.priceMomentum + 10, 0, 30) * 0.4 + normalize(subnet.emissionTrend, 0, 15) * 0.3 + (subnet.netFlow === "positive" ? 100 : subnet.netFlow === "neutral" ? 50 : 0) * 0.3);
    const quality = (normalize(subnet.age, 6, 18) * 0.35 + normalize(1 - subnet.validatorDiversity, 0.3, 0.5) * 0.3 + normalize(subnet.successRate, 90, 100) * 0.35);
    const valuation = calculatePERatio(subnet).score;
    const total = Math.round(economic * 0.25 + network * 0.25 + liquidity * 0.15 + momentum * 0.10 + quality * 0.10 + valuation * 0.15);
    return { total, breakdown: { economic: Math.round(economic), network: Math.round(network), liquidity: Math.round(liquidity), momentum: Math.round(momentum), quality: Math.round(quality), valuation: Math.round(valuation) } };
  };

  const calculateGitHubScore = (s) => Math.round((Math.min(100, (s.githubCommits / 250) * 100) * 0.25 + Math.min(100, (s.githubContributors / 15) * 100) * 0.2 + s.testCoverage * 0.25 + (s.securityAudit ? 100 : 0) * 0.15 + Math.max(0, 100 - s.lastCommit * 12) * 0.15));
  const calculateCompositeScore = (subnet) => Math.round(calculateDeAIScore(subnet).total * 0.75 + calculateGitHubScore(subnet) * 0.25);
  const formatValue = (v) => currencyMode === 'usd' ? (v * taoPrice >= 1e6 ? `$${(v * taoPrice / 1e6).toFixed(2)}M` : v * taoPrice >= 1000 ? `$${(v * taoPrice / 1000).toFixed(1)}K` : `$${(v * taoPrice).toFixed(2)}`) : (v >= 1000 ? `${(v / 1000).toFixed(2)}K τ` : `${v.toFixed(4)} τ`);
  const formatAlphaPrice = (v) => currencyMode === 'usd' ? `$${(v * taoPrice).toFixed(4)}` : `${v.toFixed(6)} τ`;
  const getScoreColor = (s) => s >= 80 ? 'text-emerald-400' : s >= 65 ? 'text-lime-400' : s >= 50 ? 'text-yellow-400' : s >= 35 ? 'text-orange-400' : 'text-red-400';
  const getScoreBgColor = (s) => s >= 80 ? 'bg-emerald-500' : s >= 65 ? 'bg-lime-500' : s >= 50 ? 'bg-yellow-500' : s >= 35 ? 'bg-orange-500' : 'bg-red-500';
  const getScoreGrade = (s) => s >= 85 ? { grade: 'A+', color: 'text-emerald-400' } : s >= 80 ? { grade: 'A', color: 'text-emerald-400' } : s >= 75 ? { grade: 'A-', color: 'text-lime-400' } : s >= 70 ? { grade: 'B+', color: 'text-lime-400' } : s >= 65 ? { grade: 'B', color: 'text-lime-400' } : s >= 60 ? { grade: 'B-', color: 'text-yellow-400' } : s >= 55 ? { grade: 'C+', color: 'text-yellow-400' } : s >= 50 ? { grade: 'C', color: 'text-yellow-400' } : { grade: 'D', color: 'text-orange-400' };
  const getValuationIcon = (i) => i === 'undervalued' ? <ThumbsUp size={16} className="text-emerald-400" /> : i === 'overbought' ? <AlertTriangle size={16} className="text-red-400" /> : <Scale size={16} className="text-yellow-400" />;

  const sortedSubnets = useMemo(() => {
    let sorted = [...subnets];
    if (sortBy === 'compositeScore') sorted.sort((a, b) => calculateCompositeScore(b) - calculateCompositeScore(a));
    else if (sortBy === 'peRatio') sorted.sort((a, b) => calculatePERatio(a).ratio - calculatePERatio(b).ratio);
    else if (sortBy === 'emissionYield') sorted.sort((a, b) => calculatePERatio(b).emissionYield - calculatePERatio(a).emissionYield);
    else if (sortBy === 'marketCap') sorted.sort((a, b) => calculateDerivedMetrics(b).marketCap - calculateDerivedMetrics(a).marketCap);
    else if (sortBy === 'emission') sorted.sort((a, b) => b.dailyEmission - a.dailyEmission);
    return sorted.filter(s => calculateDeAIScore(s).total >= filterMinScore);
  }, [sortBy, filterMinScore]);

  const avgComposite = Math.round(subnets.reduce((a, s) => a + calculateCompositeScore(s), 0) / subnets.length);
  const avgPE = (subnets.reduce((a, s) => a + calculatePERatio(s).ratio, 0) / subnets.length).toFixed(3);
  const valuationCounts = subnets.reduce((a, s) => { const pe = calculatePERatio(s); if (pe.icon === 'undervalued') a.undervalued++; else if (pe.icon === 'overbought') a.overbought++; else a.fair++; return a; }, { undervalued: 0, fair: 0, overbought: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3 animate-gradient">
              <Zap className="text-purple-400 animate-pulse" size={40} />DeAI Subnet Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Bittensor subnet analysis • <span className="text-purple-400 font-semibold">TAO: ${taoPrice.toFixed(2)}</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowMethodology(!showMethodology)} className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 border border-slate-700 hover:border-purple-500/50 shadow-lg">
              <Info size={18} />Methodology
            </button>
            <button onClick={() => setCurrencyMode(currencyMode === 'usd' ? 'tao' : 'usd')} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-purple-500/30">
              <DollarSign size={18} />{currencyMode.toUpperCase()}
            </button>
          </div>
        </div>
        {showMethodology && (
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-purple-500/40 shadow-2xl shadow-purple-500/20 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><BarChart3 size={24} className="text-purple-400" />Scoring Methodology</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><h4 className="text-purple-400 font-semibold mb-3 text-base">Price & Market Cap</h4><p className="text-gray-300 text-sm leading-relaxed">• Alpha Price = TAO in Pool ÷ Alpha in Pool</p><p className="text-gray-300 text-sm leading-relaxed">• Market Cap = Price × Circulating Supply</p><p className="text-gray-300 text-sm leading-relaxed">• Liquidity = 2 × TAO in Pool</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><h4 className="text-purple-400 font-semibold mb-3 text-base">DeAI Score (75%)</h4><p className="text-gray-300 text-sm leading-relaxed">Economic 25% | Network 25% | Valuation 15% | Liquidity 15% | Momentum 10% | Quality 10%</p></div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"><h4 className="text-purple-400 font-semibold mb-3 text-base">P/E Ratio = MCap ÷ Daily Emission</h4><p className="text-emerald-400 text-sm">Undervalued: P/E &lt; 0.25</p><p className="text-yellow-400 text-sm">Fair Value: 0.25-0.40</p><p className="text-red-400 text-sm">Overbought: P/E &gt; 0.40</p></div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur rounded-2xl p-5 border border-purple-500/40 hover:border-purple-400/60 transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/20 group">
          <div className="text-gray-400 text-xs mb-2 font-medium uppercase tracking-wider">Subnets</div>
          <div className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">{subnets.length}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur rounded-2xl p-5 border border-purple-500/40 hover:border-purple-400/60 transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/20 group">
          <div className="text-gray-400 text-xs mb-2 font-medium uppercase tracking-wider">Avg Score</div>
          <div className={`text-3xl font-bold ${getScoreColor(avgComposite)} transition-colors`}>{avgComposite}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur rounded-2xl p-5 border border-purple-500/40 hover:border-purple-400/60 transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/20 group">
          <div className="text-gray-400 text-xs mb-2 font-medium uppercase tracking-wider">Avg P/E</div>
          <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{avgPE}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900/80 backdrop-blur rounded-2xl p-5 border border-emerald-500/40 hover:border-emerald-400/60 transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/20 group">
          <div className="text-gray-400 text-xs mb-2 flex items-center gap-1.5 font-medium uppercase tracking-wider"><ThumbsUp size={14} className="text-emerald-400" />Undervalued</div>
          <div className="text-3xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{valuationCounts.undervalued}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-900/30 to-slate-900/80 backdrop-blur rounded-2xl p-5 border border-yellow-500/40 hover:border-yellow-400/60 transition-all hover:scale-105 shadow-lg hover:shadow-yellow-500/20 group">
          <div className="text-gray-400 text-xs mb-2 flex items-center gap-1.5 font-medium uppercase tracking-wider"><Scale size={14} className="text-yellow-400" />Fair Value</div>
          <div className="text-3xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">{valuationCounts.fair}</div>
        </div>
        <div className="bg-gradient-to-br from-red-900/30 to-slate-900/80 backdrop-blur rounded-2xl p-5 border border-red-500/40 hover:border-red-400/60 transition-all hover:scale-105 shadow-lg hover:shadow-red-500/20 group">
          <div className="text-gray-400 text-xs mb-2 flex items-center gap-1.5 font-medium uppercase tracking-wider"><AlertTriangle size={14} className="text-red-400" />Overbought</div>
          <div className="text-3xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{valuationCounts.overbought}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur rounded-xl px-5 py-3 border border-purple-500/40 shadow-lg hover:border-purple-400/60 transition-all">
          <ArrowUpDown size={18} className="text-purple-400" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-white text-sm focus:outline-none cursor-pointer font-medium">
            <option value="compositeScore" className="bg-slate-800">Composite Score</option>
            <option value="peRatio" className="bg-slate-800">P/E Ratio (Low→High)</option>
            <option value="emissionYield" className="bg-slate-800">Emission Yield</option>
            <option value="marketCap" className="bg-slate-800">Market Cap</option>
            <option value="emission" className="bg-slate-800">Daily Emission</option>
          </select>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur rounded-xl px-5 py-3 border border-purple-500/40 shadow-lg hover:border-purple-400/60 transition-all">
          <Filter size={18} className="text-purple-400" />
          <span className="text-gray-400 text-sm font-medium">Min Score:</span>
          <input type="range" min="0" max="80" value={filterMinScore} onChange={(e) => setFilterMinScore(Number(e.target.value))} className="w-24 accent-purple-500 cursor-pointer" />
          <span className="text-white text-sm font-bold bg-purple-500/20 px-3 py-1 rounded-lg min-w-[3rem] text-center">{filterMinScore}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-3">
        {sortedSubnets.map((subnet, index) => {
          const deaiScore = calculateDeAIScore(subnet);
          const githubScore = calculateGitHubScore(subnet);
          const compositeScore = calculateCompositeScore(subnet);
          const peData = calculatePERatio(subnet);
          const derived = calculateDerivedMetrics(subnet);
          const grade = getScoreGrade(compositeScore);
          const isExpanded = expandedSubnet === subnet.id;

          return (
            <div key={subnet.id} className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur rounded-2xl border border-purple-500/40 overflow-hidden hover:border-purple-400/70 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <div className="p-5 md:p-6 cursor-pointer" onClick={() => setExpandedSubnet(isExpanded ? null : subnet.id)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-gray-500 text-sm font-mono bg-slate-700/50 px-2.5 py-1 rounded-lg">#{index + 1}</span>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SN{subnet.id}: {subnet.name}</h2>
                      <span className={`text-3xl font-bold ${grade.color} drop-shadow-lg`}>{grade.grade}</span>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg ${peData.icon === 'undervalued' ? 'bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-300 border border-emerald-400/50' : peData.icon === 'overbought' ? 'bg-gradient-to-r from-red-500/30 to-red-600/30 text-red-300 border border-red-400/50' : 'bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 text-yellow-300 border border-yellow-400/50'}`}>
                        {getValuationIcon(peData.icon)}{peData.status}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{subnet.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div className="bg-slate-700/30 rounded-lg p-2.5 border border-slate-600/50"><div className="text-gray-400 text-xs mb-1 font-medium">Alpha Price</div><div className="text-white font-bold">{formatAlphaPrice(derived.alphaPrice)}</div></div>
                      <div className="bg-slate-700/30 rounded-lg p-2.5 border border-slate-600/50"><div className="text-gray-400 text-xs mb-1 font-medium">Market Cap</div><div className="text-white font-bold">{formatValue(derived.marketCap)}</div></div>
                      <div className="bg-slate-700/30 rounded-lg p-2.5 border border-slate-600/50"><div className="text-gray-400 text-xs mb-1 font-medium">P/E Ratio</div><div className={`font-bold ${peData.color}`}>{peData.ratio.toFixed(3)}</div></div>
                      <div className="bg-slate-700/30 rounded-lg p-2.5 border border-slate-600/50"><div className="text-gray-400 text-xs mb-1 font-medium">Emission Yield</div><div className="text-blue-400 font-bold">{peData.emissionYield.toFixed(1)}%</div></div>
                      <div className="bg-slate-700/30 rounded-lg p-2.5 border border-slate-600/50"><div className="text-gray-400 text-xs mb-1 font-medium">Daily Emission</div><div className="text-white font-bold">{formatValue(subnet.dailyEmission)}</div></div>
                      <div className="bg-slate-700/30 rounded-lg p-2.5 border border-slate-600/50"><div className="text-gray-400 text-xs mb-1 font-medium">Momentum</div><div className={`font-bold flex items-center gap-1 ${subnet.priceMomentum >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{subnet.priceMomentum >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{subnet.priceMomentum > 0 ? '+' : ''}{subnet.priceMomentum}%</div></div>
                    </div>
                  </div>
                  <div className="transition-transform group-hover:scale-110">{isExpanded ? <ChevronUp size={24} className="text-purple-400" /> : <ChevronDown size={24} className="text-purple-400" />}</div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 md:px-5 pb-5 border-t border-purple-500/30 pt-5">
                  <div className="mb-5 bg-gradient-to-r from-slate-700/40 to-slate-700/20 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2"><Gauge size={20} className="text-purple-400" />Valuation Analysis</h3>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${peData.icon === 'undervalued' ? 'bg-emerald-500/20' : peData.icon === 'overbought' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>{getValuationIcon(peData.icon)}<span className={`font-bold ${peData.color}`}>{peData.status}</span></div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{peData.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Undervalued</span><span>Fair Value</span><span>Overbought</span></div>
                      <div className="h-3 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full relative">
                        <div className="absolute top-1/2 w-4 h-4 bg-white rounded-full border-2 border-slate-900 shadow-lg" style={{ left: `${Math.min(95, Math.max(5, (peData.ratio / 0.60) * 100))}%`, transform: 'translate(-50%, -50%)' }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1"><span>0.00</span><span>0.25</span><span>0.40</span><span>0.60+</span></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-slate-800/50 rounded-lg p-3"><div className="text-gray-500 text-xs">P/E Ratio</div><div className={`text-xl font-bold ${peData.color}`}>{peData.ratio.toFixed(4)}</div></div>
                      <div className="bg-slate-800/50 rounded-lg p-3"><div className="text-gray-500 text-xs">Emission Yield</div><div className="text-xl font-bold text-blue-400">{peData.emissionYield.toFixed(2)}%</div></div>
                      <div className="bg-slate-800/50 rounded-lg p-3"><div className="text-gray-500 text-xs">Valuation Score</div><div className={`text-xl font-bold ${getScoreColor(peData.score)}`}>{peData.score}/100</div></div>
                      <div className="bg-slate-800/50 rounded-lg p-3"><div className="text-gray-500 text-xs">Days to MCap</div><div className="text-xl font-bold text-white">{peData.ratio.toFixed(2)}</div></div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><BarChart3 size={18} className="text-purple-400" />Score Breakdown</h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                      {Object.entries(deaiScore.breakdown).map(([cat, score]) => (
                        <div key={cat} className={`rounded-lg p-3 ${cat === 'valuation' ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-700/40'}`}>
                          <div className="flex justify-between mb-2"><span className="text-gray-400 text-xs capitalize">{cat}</span><span className={`text-sm font-semibold ${getScoreColor(score)}`}>{score}</span></div>
                          <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden"><div className={`h-full ${getScoreBgColor(score)}`} style={{ width: `${score}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5 bg-slate-700/30 rounded-xl p-4">
                    <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><Activity size={18} className="text-blue-400" />Liquidity Pool</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div><div className="text-gray-500 text-xs">TAO in Pool</div><div className="text-white font-semibold">{formatValue(subnet.taoInPool)}</div></div>
                      <div><div className="text-gray-500 text-xs">Alpha in Pool</div><div className="text-white font-semibold">{subnet.alphaInPool.toLocaleString()} α</div></div>
                      <div><div className="text-gray-500 text-xs">Circulating Supply</div><div className="text-white font-semibold">{subnet.circulatingSupply.toLocaleString()} α</div></div>
                      <div><div className="text-gray-500 text-xs">Total Liquidity</div><div className="text-white font-semibold">{formatValue(derived.taoLiquidity)}</div></div>
                      <div><div className="text-gray-500 text-xs">Liq/MCap Ratio</div><div className="text-white font-semibold">{derived.liquidityMcRatio.toFixed(1)}%</div></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm"><Users size={16} className="text-green-400" />Network</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-400">Validators</span><span className="text-white">{subnet.validatorCount}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Total Stake</span><span className="text-white">{subnet.totalStake.toLocaleString()} α</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">UID Utilization</span><span className="text-white">{subnet.uidUtilization}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Active Miners</span><span className="text-white">{subnet.weeklyActiveMiners}</span></div>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm"><Code size={16} className="text-purple-400" />Development</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-400">GitHub Score</span><span className={getScoreColor(githubScore)}>{githubScore}/100</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Commits (30d)</span><span className="text-white">{subnet.githubCommits}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Contributors</span><span className="text-white">{subnet.githubContributors}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Security Audit</span><span className={subnet.securityAudit ? 'text-emerald-400' : 'text-red-400'}>{subnet.securityAudit ? '✓ Yes' : '✗ No'}</span></div>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm"><Shield size={16} className="text-blue-400" />Performance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-400">Success Rate</span><span className="text-white">{subnet.successRate}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Emission Share</span><span className="text-white">{subnet.emissionShare}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Emission Trend</span><span className={subnet.emissionTrend >= 0 ? 'text-emerald-400' : 'text-red-400'}>{subnet.emissionTrend > 0 ? '+' : ''}{subnet.emissionTrend}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Net Flow</span><span className={subnet.netFlow === 'positive' ? 'text-emerald-400' : subnet.netFlow === 'neutral' ? 'text-yellow-400' : 'text-red-400'}>{subnet.netFlow}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Price = TAO in Pool ÷ Alpha in Pool • Market Cap = Price × Circulating Supply • P/E = Market Cap ÷ Daily Emission</p>
      </div>
    </div>
  );
};

export default DeAISubnetDashboard;

