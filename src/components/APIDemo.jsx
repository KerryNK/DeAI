/**
 * API Integration Demo Component
 * Shows how to use the API client to fetch and display Taostats data
 */

import React, { useState, useEffect } from 'react';
import { apiClient, formatTAO, formatNumber } from '../api/client.js';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function APIDemo() {
  const [data, setData] = useState({
    stats: null,
    subnets: null,
    validators: null,
    selectedNetuid: 36,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubnetData = async (netuid) => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, subnetsData, validatorsData] = await Promise.all([
        apiClient.getStats(),
        apiClient.getSubnets(),
        apiClient.getValidators(netuid),
      ]);

      setData({
        stats: statsData,
        subnets: subnetsData,
        validators: validatorsData,
        selectedNetuid: netuid,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubnetData(36);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          API Integration Demo
        </h1>
        <p className="text-gray-400 mb-8">Live integration between React frontend and FastAPI backend</p>

        {/* Status Banner */}
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${error ? 'bg-red-500/10 border border-red-500/50' : 'bg-green-500/10 border border-green-500/50'}`}>
          {error ? (
            <>
              <AlertTriangle className="text-red-400" size={24} />
              <div>
                <p className="text-red-400 font-semibold">Error Connecting to Backend</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="text-green-400" size={24} />
              <div>
                <p className="text-green-400 font-semibold">Backend Connected</p>
                <p className="text-green-300 text-sm">Successfully fetching data from API</p>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => fetchSubnetData(36)}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
          <input
            type="number"
            value={data.selectedNetuid}
            onChange={(e) => setData({ ...data, selectedNetuid: parseInt(e.target.value) })}
            onKeyPress={(e) => e.key === 'Enter' && fetchSubnetData(parseInt(e.target.value))}
            placeholder="Enter Subnet ID"
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />
        </div>

        {/* Data Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Network Stats */}
          {data.stats && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Network Statistics</h2>
              <div className="space-y-3">
                {Object.entries(data.stats).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-white font-semibold">{String(value).slice(0, 50)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subnets Count */}
          {data.subnets && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Subnets Overview</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Subnets</span>
                  <span className="text-white font-semibold text-lg">
                    {Array.isArray(data.subnets) ? data.subnets.length : Object.keys(data.subnets).length}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded p-4 mt-4">
                  <p className="text-gray-400 text-sm font-mono">
                    {JSON.stringify(data.subnets).slice(0, 200)}...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Validators */}
          {data.validators && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 md:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">
                Validators for Subnet {data.selectedNetuid}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-700">
                    <tr>
                      <th className="text-left text-gray-400 py-2">Hotkey</th>
                      <th className="text-right text-gray-400 py-2">Stake</th>
                      <th className="text-right text-gray-400 py-2">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(data.validators) ? data.validators : [])
                      .slice(0, 10)
                      .map((validator, idx) => (
                        <tr key={idx} className="border-b border-slate-700/50">
                          <td className="text-gray-300 py-2 font-mono text-xs">
                            {typeof validator === 'string'
                              ? validator.slice(0, 16) + '...'
                              : validator.hotkey?.slice(0, 16) + '...' || 'N/A'}
                          </td>
                          <td className="text-right text-white py-2">
                            {typeof validator === 'object' && validator.stake
                              ? formatNumber(validator.stake)
                              : 'N/A'}
                          </td>
                          <td className="text-right text-purple-400 py-2">
                            {typeof validator === 'object' && validator.score
                              ? validator.score.toFixed(2)
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Usage Example</h2>
          <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm text-gray-300">
{`import { apiClient, formatTAO } from '@/api/client.js';

// Fetch subnet details
const subnet = await apiClient.getSubnetDetails(36);

// Fetch validators
const validators = await apiClient.getValidators(36);

// Fetch APY data
const apy = await apiClient.getSubnetAPY(36);

// Format values
console.log(formatTAO(1000.5)); // "1,000.5 TAO"`}
          </pre>
        </div>

        {/* API Reference */}
        <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Available API Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-700/30 p-3 rounded">
              <p className="text-purple-400 font-mono">apiClient.getSubnets()</p>
              <p className="text-gray-400 text-xs mt-1">Get list of all subnets</p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded">
              <p className="text-purple-400 font-mono">apiClient.getSubnetDetails(netuid)</p>
              <p className="text-gray-400 text-xs mt-1">Get subnet details and metrics</p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded">
              <p className="text-purple-400 font-mono">apiClient.getValidators(netuid)</p>
              <p className="text-gray-400 text-xs mt-1">Get validators for subnet</p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded">
              <p className="text-purple-400 font-mono">apiClient.getNeurons(netuid)</p>
              <p className="text-gray-400 text-xs mt-1">Get miners/neurons for subnet</p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded">
              <p className="text-purple-400 font-mono">apiClient.getSubnetAPY(netuid)</p>
              <p className="text-gray-400 text-xs mt-1">Get APY information</p>
            </div>
            <div className="bg-slate-700/30 p-3 rounded">
              <p className="text-purple-400 font-mono">apiClient.getStats()</p>
              <p className="text-gray-400 text-xs mt-1">Get network statistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
