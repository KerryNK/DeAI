"""
DeAI Backend - FastAPI Server
Integrates with taostats for subnet and validator data
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import httpx
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

# Global httpx client
client: Optional[httpx.AsyncClient] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage app lifecycle - initialize and cleanup httpx client"""
    global client
    client = httpx.AsyncClient(timeout=30.0)
    yield
    await client.aclose()

app = FastAPI(
    title="DeAI Backend",
    description="API for DeAI Subnet Dashboard - Taostats Integration",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for local development
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Taostats API base URL
TAOSTATS_API = "https://api.taostats.io"

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "DeAI Backend",
        "version": "1.0.0"
    }

@app.get("/api/subnets")
async def get_subnets():
    """
    Get list of all subnets from Taostats
    Returns basic subnet information including netuid, name, and stats
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/subnets")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch subnets: {str(e)}")

@app.get("/api/subnet/{netuid}")
async def get_subnet_details(netuid: int):
    """
    Get detailed information for a specific subnet
    Includes validators, incentive, emission, and performance metrics
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/subnet/{netuid}")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch subnet {netuid}: {str(e)}")

@app.get("/api/validators/{netuid}")
async def get_validators(netuid: int):
    """
    Get list of validators for a specific subnet
    Returns validator hotkeys, stake, and performance metrics
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/subnet/{netuid}/validators")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch validators for subnet {netuid}: {str(e)}")

@app.get("/api/neurons/{netuid}")
async def get_neurons(netuid: int):
    """
    Get list of neurons (miners) for a specific subnet
    Returns neuron details including stake, dividends, and incentive values
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/subnet/{netuid}/neurons")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch neurons for subnet {netuid}: {str(e)}")

@app.get("/api/apy/{netuid}")
async def get_apy(netuid: int):
    """
    Get APY (Annual Percentage Yield) information for a subnet
    Includes validator APY, miner APY, and composite returns
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/subnet/{netuid}/apy")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch APY for subnet {netuid}: {str(e)}")

@app.get("/api/weight-copy")
async def get_weight_copy_info():
    """
    Get weight copy (delegation) information across subnets
    Returns top weight copy operators and their earnings
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/weight-copy")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch weight copy info: {str(e)}")

@app.get("/api/nominator/{hotkey}")
async def get_nominator_info(hotkey: str):
    """
    Get nominator (delegator) information
    Returns delegation details, stake, and rewards for a specific hotkey
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/nominator/{hotkey}")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch nominator info for {hotkey}: {str(e)}")

@app.get("/api/search/{query}")
async def search(query: str):
    """
    Search for hotkeys, validators, or subnet info
    Returns matching results across different entity types
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/search", params={"q": query})
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Search failed for '{query}': {str(e)}")

@app.get("/api/stats")
async def get_general_stats():
    """
    Get general Bittensor network statistics
    Includes total stake, token supply, and network health metrics
    """
    try:
        response = await client.get(f"{TAOSTATS_API}/api/stats")
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch general stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )
