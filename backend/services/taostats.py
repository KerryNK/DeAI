"""
TAOStats Service
Fetches Bittensor subnet and validator data
"""

import httpx
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class TAOStatsService:
    """TAOStats API integration for Bittensor data"""
    
    def __init__(self):
        """Initialize TAOStats service"""
        self.base_url = "https://api.taostats.io/api"
    
    async def get_subnets(self) -> List[Dict[str, Any]]:
        """Get list of all subnets"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/subnets",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching subnets: {e}")
            return []
    
    async def get_subnet(self, subnet_id: int) -> Dict[str, Any]:
        """Get specific subnet details"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/subnet/{subnet_id}",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching subnet {subnet_id}: {e}")
            return {}
    
    async def get_validators(self) -> List[Dict[str, Any]]:
        """Get all validators across subnets"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/validators",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching validators: {e}")
            return []
    
    async def get_market_data(self) -> Dict[str, Any]:
        """Get market data from TAOStats"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/market",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching market data: {e}")
            return {}
    
    async def get_emissions(self) -> Dict[str, Any]:
        """Get emissions data"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/emissions",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching emissions: {e}")
            return {}
    
    async def get_subnet_validators(self, subnet_id: int) -> List[Dict[str, Any]]:
        """Get validators for a specific subnet"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/subnet/{subnet_id}/validators",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching subnet {subnet_id} validators: {e}")
            return []
    
    async def get_subnet_neurons(self, subnet_id: int) -> List[Dict[str, Any]]:
        """Get neurons (miners) for a specific subnet"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/subnet/{subnet_id}/neurons",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error fetching subnet {subnet_id} neurons: {e}")
            return []
    
    async def search_hotkey(self, hotkey: str) -> Dict[str, Any]:
        """Search for a hotkey"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/search/{hotkey}",
                    timeout=10.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error searching hotkey {hotkey}: {e}")
            return {}
