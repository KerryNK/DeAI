/**
 * useWebSocket Hook for Real-Time Updates
 * Subscribe to live price, subnet, and validator data
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const ws = useRef(null);
  const subscriptions = useRef(new Set());

  useEffect(() => {
    // Connect to WebSocket
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setError(null);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
    };

    ws.current.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket connection error');
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  const subscribe = useCallback((channel) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: 'subscribe',
        channel: channel,
      }));
      subscriptions.current.add(channel);
    }
  }, []);

  const unsubscribe = useCallback((channel) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        action: 'unsubscribe',
        channel: channel,
      }));
      subscriptions.current.delete(channel);
    }
  }, []);

  return {
    data,
    isConnected,
    error,
    subscribe,
    unsubscribe,
  };
}

/**
 * Example usage in a component:
 * 
 * function PriceTracker() {
 *   const { data, isConnected, subscribe } = useWebSocket('ws://localhost:8000/ws/live');
 *
 *   useEffect(() => {
 *     if (isConnected) {
 *       subscribe('price');
 *     }
 *   }, [isConnected, subscribe]);
 *
 *   if (!isConnected) return <div>Connecting...</div>;
 *
 *   return (
 *     <div>
 *       {data?.type === 'price' && (
 *         <div>
 *           <h1>${data.data.price}</h1>
 *           <p>{data.data.change24h}%</p>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 */
