"""
CoinGecko Service
Fetches live cryptocurrency data
"""

import httpx
import asyncio
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class CoinGeckoService:
    """CoinGecko API integration for cryptocurrency data"""
    
    def __init__(self):
        """Initialize CoinGecko service"""
        self.base_url = "https://api.coingecko.com/api/v3"
        self.tao_id = "bittensor"
    
    async def get_tao_price(self) -> Dict[str, Any]:
        """Get current TAO (Bittensor) price in USD"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/simple/price",
                    params={
                        "ids": self.tao_id,
                        "vs_currencies": "usd",
                        "include_market_cap": "true",
                        "include_24hr_vol": "true",
                        "include_24hr_change": "true",
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()
                
                bittensor = data.get(self.tao_id, {})
                return {
                    "price": bittensor.get("usd"),
                    "marketCap": bittensor.get("usd_market_cap"),
                    "volume24h": bittensor.get("usd_24h_vol"),
                    "change24h": bittensor.get("usd_24h_change"),
                    "timestamp": asyncio.get_event_loop().time(),
                }
        except Exception as e:
            logger.error(f"Error fetching TAO price: {e}")
            return {
                "price": None,
                "marketCap": None,
                "volume24h": None,
                "change24h": None,
                "error": str(e),
            }
    
    async def get_tao_marketcap(self) -> Dict[str, Any]:
        """Get TAO market cap data"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/simple/price",
                    params={
                        "ids": self.tao_id,
                        "vs_currencies": "usd",
                        "include_market_cap": "true",
                        "include_market_cap_rank": "true",
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()
                
                bittensor = data.get(self.tao_id, {})
                return {
                    "marketCap": bittensor.get("usd_market_cap"),
                    "rank": bittensor.get("usd_market_cap_rank"),
                    "price": bittensor.get("usd"),
                }
        except Exception as e:
            logger.error(f"Error fetching TAO market cap: {e}")
            return {"error": str(e)}
    
    async def get_historical_price(self, days: int = 30) -> Dict[str, Any]:
        """Get historical price data"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/coins/{self.tao_id}/market_chart",
                    params={
                        "vs_currency": "usd",
                        "days": days,
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching historical price: {e}")
            return {"error": str(e)}
