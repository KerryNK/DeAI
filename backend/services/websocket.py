"""
WebSocket Service for Real-Time Updates
Provides live price, subnet, and validator data streams
"""

from fastapi import WebSocket
import asyncio
import json
import logging
from typing import Set, Dict
from datetime import datetime

logger = logging.getLogger(__name__)

class ConnectionManager:
    """Manage WebSocket connections and broadcasts"""
    
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
        self.subscriptions: Dict[str, Set[WebSocket]] = {
            "price": set(),
            "subnets": set(),
            "validators": set(),
        }
    
    async def connect(self, websocket: WebSocket):
        """Accept and register new connection"""
        await websocket.accept()
        self.active_connections.add(websocket)
        logger.info(f"Client connected. Total: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        """Remove disconnected client"""
        self.active_connections.discard(websocket)
        for subs in self.subscriptions.values():
            subs.discard(websocket)
        logger.info(f"Client disconnected. Total: {len(self.active_connections)}")
    
    def subscribe(self, websocket: WebSocket, channel: str):
        """Subscribe client to data channel"""
        if channel in self.subscriptions:
            self.subscriptions[channel].add(websocket)
            logger.info(f"Client subscribed to {channel}")
    
    def unsubscribe(self, websocket: WebSocket, channel: str):
        """Unsubscribe client from data channel"""
        if channel in self.subscriptions:
            self.subscriptions[channel].discard(websocket)
            logger.info(f"Client unsubscribed from {channel}")
    
    async def broadcast_to_channel(self, channel: str, data: dict):
        """Broadcast message to all subscribers of channel"""
        disconnected = set()
        for connection in self.subscriptions[channel]:
            try:
                await connection.send_json({
                    "type": channel,
                    "data": data,
                    "timestamp": datetime.now().isoformat(),
                })
            except Exception as e:
                logger.error(f"Error broadcasting to {channel}: {e}")
                disconnected.add(connection)
        
        # Clean up disconnected clients
        for connection in disconnected:
            self.disconnect(connection)

manager = ConnectionManager()

# Example WebSocket endpoint to add to main.py:
"""
@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message["action"] == "subscribe":
                manager.subscribe(websocket, message["channel"])
                await websocket.send_json({
                    "type": "subscribed",
                    "channel": message["channel"]
                })
            
            elif message["action"] == "unsubscribe":
                manager.unsubscribe(websocket, message["channel"])
                await websocket.send_json({
                    "type": "unsubscribed",
                    "channel": message["channel"]
                })
    
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket)
"""

# Background task to broadcast live data:
"""
async def broadcast_price_updates(coingecko_service, cache_service):
    while True:
        try:
            price = await coingecko_service.get_tao_price()
            await manager.broadcast_to_channel("price", price)
            cache_service.set("tao_price_live", price, ttl=15)
            await asyncio.sleep(15)  # Update every 15 seconds
        except Exception as e:
            logger.error(f"Error broadcasting price: {e}")
            await asyncio.sleep(30)

# Schedule in lifespan:
asyncio.create_task(broadcast_price_updates(coingecko_service, cache_service))
"""
