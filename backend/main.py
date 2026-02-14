"""
DeAI Backend - FastAPI Server
Live TAO data, Redis caching, PostgreSQL integration
"""

from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import httpx
import redis
import os
from dotenv import load_dotenv
from typing import Optional
import logging
import asyncio
from datetime import datetime

# Import services
from services.taostats import TAOStatsService
from services.coingecko import CoinGeckoService
from services.cache import CacheService
from services.database import Database
from services.auth import AuthService

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global instances
cache_service: Optional[CacheService] = None
taostats_service: Optional[TAOStatsService] = None
coingecko_service: Optional[CoinGeckoService] = None
db: Optional[Database] = None
auth_service: Optional[AuthService] = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage app lifecycle - startup and shutdown"""
    global cache_service, taostats_service, coingecko_service, db, auth_service
    
    # Startup
    logger.info("Starting DeAI Backend...")
    
    try:
        # Initialize services
        cache_service = CacheService()
        taostats_service = TAOStatsService()
        coingecko_service = CoinGeckoService()
        db = Database()
        auth_service = AuthService(db)
        
        logger.info("All services initialized successfully")
        
        yield
        
    finally:
        # Shutdown
        logger.info("Shutting down DeAI Backend...")
        if cache_service:
            cache_service.close()
        logger.info("Cleanup complete")

# Create FastAPI app
app = FastAPI(
    title="DeAI Backend",
    description="Live Bittensor subnet staking data",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure based on deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# HEALTH CHECK
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "cache": "ok" if cache_service else "offline",
            "database": "ok" if db else "offline",
        }
    }

# ============================================
# TAO PRICE ENDPOINTS
# ============================================

@app.get("/api/tao/price")
async def get_tao_price():
    """Get current TAO price with 30s cache"""
    try:
        # Try cache first
        cached = cache_service.get("tao_price")
        if cached:
            return cached
        
        # Fetch from CoinGecko
        price_data = await coingecko_service.get_tao_price()
        
        # Cache for 30 seconds
        cache_service.set("tao_price", price_data, ttl=30)
        
        return price_data
        
    except Exception as e:
        logger.error(f"Error fetching TAO price: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tao/marketcap")
async def get_tao_marketcap():
    """Get TAO market cap with 5m cache"""
    try:
        cached = cache_service.get("tao_marketcap")
        if cached:
            return cached
        
        cap_data = await coingecko_service.get_tao_marketcap()
        cache_service.set("tao_marketcap", cap_data, ttl=300)
        
        return cap_data
        
    except Exception as e:
        logger.error(f"Error fetching TAO marketcap: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# SUBNET ENDPOINTS
# ============================================

@app.get("/api/subnets")
async def get_subnets():
    """Get all subnets with 60s cache"""
    try:
        cached = cache_service.get("subnets_list")
        if cached:
            return cached
        
        subnets = await taostats_service.get_subnets()
        cache_service.set("subnets_list", subnets, ttl=60)
        
        return {"subnets": subnets, "count": len(subnets)}
        
    except Exception as e:
        logger.error(f"Error fetching subnets: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/subnets/{subnet_id}")
async def get_subnet_detail(subnet_id: int):
    """Get specific subnet details"""
    try:
        cache_key = f"subnet_{subnet_id}"
        cached = cache_service.get(cache_key)
        if cached:
            return cached
        
        subnet = await taostats_service.get_subnet(subnet_id)
        cache_service.set(cache_key, subnet, ttl=60)
        
        return subnet
        
    except Exception as e:
        logger.error(f"Error fetching subnet {subnet_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# DASHBOARD ENDPOINTS
# ============================================

@app.get("/api/dashboard")
async def get_dashboard():
    """Get complete dashboard data (aggregated)"""
    try:
        cached = cache_service.get("dashboard")
        if cached:
            return cached
        
        # Fetch all data in parallel
        price_task = coingecko_service.get_tao_price()
        marketcap_task = coingecko_service.get_tao_marketcap()
        subnets_task = taostats_service.get_subnets()
        market_task = taostats_service.get_market_data()
        
        price, marketcap, subnets, market = await asyncio.gather(
            price_task, marketcap_task, subnets_task, market_task
        )
        
        dashboard = {
            "tao": {
                "price": price,
                "marketcap": marketcap,
            },
            "network": {
                "subnets": len(subnets),
                "market": market,
            },
            "timestamp": datetime.now().isoformat(),
        }
        
        cache_service.set("dashboard", dashboard, ttl=60)
        return dashboard
        
    except Exception as e:
        logger.error(f"Error fetching dashboard: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# STAKING ENDPOINTS
# ============================================

@app.get("/api/staking/positions/{address}")
async def get_staking_positions(address: str):
    """Get user staking positions from database"""
    try:
        positions = db.get_user_staking_positions(address)
        return {"positions": positions, "count": len(positions)}
    except Exception as e:
        logger.error(f"Error fetching staking positions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/staking/history/{address}")
async def get_staking_history(address: str, limit: int = 50):
    """Get user staking transaction history"""
    try:
        history = db.get_user_transaction_history(address, limit)
        return {"transactions": history, "count": len(history)}
    except Exception as e:
        logger.error(f"Error fetching staking history: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# VALIDATORS ENDPOINTS
# ============================================

@app.get("/api/validators")
async def get_validators():
    """Get validators list with 60s cache"""
    try:
        cached = cache_service.get("validators_list")
        if cached:
            return cached
        
        validators = await taostats_service.get_validators()
        cache_service.set("validators_list", validators, ttl=60)
        
        return {"validators": validators, "count": len(validators)}
        
    except Exception as e:
        logger.error(f"Error fetching validators: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# EMISSIONS ENDPOINTS
# ============================================

@app.get("/api/emissions")
async def get_emissions():
    """Get current emissions data"""
    try:
        cached = cache_service.get("emissions")
        if cached:
            return cached
        
        emissions = await taostats_service.get_emissions()
        cache_service.set("emissions", emissions, ttl=60)
        
        return emissions
        
    except Exception as e:
        logger.error(f"Error fetching emissions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# AUTHENTICATION ENDPOINTS
# ============================================

from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    username: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@app.post("/api/auth/signup")
async def signup(request: SignupRequest):
    """Create a new user account"""
    try:
        user = await auth_service.create_user(
            email=request.email,
            password=request.password,
            username=request.username
        )
        
        if not user:
            raise HTTPException(status_code=400, detail="User creation failed")
        
        token = auth_service.create_access_token({"sub": user["id"], "email": user["email"]})
        
        return {
            "token": token,
            "user": {
                "id": user["id"],
                "email": user["email"],
                "username": user["username"]
            }
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Signup error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """Authenticate user and return JWT token"""
    try:
        user = await auth_service.authenticate_user(request.email, request.password)
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        token = auth_service.create_access_token({"sub": user["id"], "email": user["email"]})
        
        return {
            "token": token,
            "user": {
                "id": user["id"],
                "email": user["email"],
                "username": user["username"]
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/auth/logout")
async def logout():
    """Logout user (client-side token removal)"""
    return {"message": "Logged out successfully"}

@app.get("/api/auth/me")
async def get_current_user(authorization: str = Header(None)):
    """Get current user information from JWT token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = auth_service.verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user_id = payload.get("sub")
    user = await auth_service.get_user_by_id(user_id)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user["id"],
        "email": user["email"],
        "username": user["username"]
    }

@app.post("/api/auth/refresh")
async def refresh_token(authorization: str = Header(None)):
    """Refresh JWT token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    payload = auth_service.verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    new_token = auth_service.create_access_token({"sub": payload["sub"], "email": payload["email"]})
    
    return {"token": new_token}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("ENV", "development") == "development"
    )
