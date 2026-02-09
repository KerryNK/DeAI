/**
 * DeAI API Client
 * 
 * Utility for communicating with the FastAPI backend
 * Handles all HTTP requests, error handling, and response formatting
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * DeAI API Client
 */
export const apiClient = {
  /**
   * Check if backend is running
   */
  async health() {
    return fetchAPI('/health');
  },

  // ===== TAO PRICE & MARKET DATA =====

  /**
   * Get current TAO price (30s cache)
   */
  async getTaoPrice() {
    return fetchAPI('/tao/price');
  },

  /**
   * Get TAO market cap (5m cache)
   */
  async getTaoMarketcap() {
    return fetchAPI('/tao/marketcap');
  },

  /**
   * Get complete dashboard data (aggregated)
   */
  async getDashboard() {
    return fetchAPI('/dashboard');
  },

  // ===== SUBNETS =====

  /**
   * Get list of all subnets (60s cache)
   */
  async getSubnets() {
    return fetchAPI('/subnets');
  },

  /**
   * Get detailed information for a specific subnet
   * @param {number} subnetId - The subnet ID
   */
  async getSubnetDetails(subnetId) {
    return fetchAPI(`/subnets/${subnetId}`);
  },

  // ===== VALIDATORS =====

  /**
   * Get all validators (60s cache)
   */
  async getValidators() {
    return fetchAPI('/validators');
  },

  /**
   * Get validators for a specific subnet
   * @param {number} subnetId - The subnet ID
   */
  async getSubnetValidators(subnetId) {
    return fetchAPI(`/subnets/${subnetId}/validators`);
  },

  // ===== EMISSIONS =====

  /**
   * Get current emissions data (60s cache)
   */
  async getEmissions() {
    return fetchAPI('/emissions');
  },

  // ===== STAKING =====

  /**
   * Get user staking positions
   * @param {string} address - Wallet address
   */
  async getStakingPositions(address) {
    return fetchAPI(`/staking/positions/${address}`);
  },

  /**
   * Get user staking transaction history
   * @param {string} address - Wallet address
   * @param {number} limit - Number of transactions to fetch (default: 50)
   */
  async getStakingHistory(address, limit = 50) {
    return fetchAPI(`/staking/history/${address}?limit=${limit}`);
  },
};

/**
 * Helper to format numbers with thousand separators
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Helper to format currency values
 */
export function formatCurrency(amount, decimals = 2) {
  if (amount === null || amount === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Helper to format percentages
 */
export function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined) return '-';
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Helper to format TAO amounts
 */
export function formatTAO(amount, decimals = 2) {
  if (amount === null || amount === undefined) return '-';
  return `${formatNumber(Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals))} TAO`;
}

/**
 * Helper to truncate hotkeys
 */
export function truncateHotkey(hotkey, chars = 6) {
  if (!hotkey || hotkey.length <= chars * 2) return hotkey;
  return `${hotkey.slice(0, chars)}...${hotkey.slice(-chars)}`;
}

/**
 * Helper to format timestamps
 */
export function formatTime(timestamp) {
  if (!timestamp) return '-';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

/**
 * Helper to get status color class
 */
export function getStatusColorClass(status) {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'badge-success';
    case 'inactive':
      return 'badge-error';
    case 'pending':
      return 'badge-warning';
    default:
      return 'badge-info';
  }
}

export default apiClient;
