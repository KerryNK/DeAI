# DeAI Backend - FastAPI Server

Production-ready FastAPI backend for institutional Bittensor staking platform with live TAO data, Redis caching, and PostgreSQL persistence.

## Features

- **Live TAO Data**: Real-time Bittensor price and market cap via CoinGecko
- **Subnet Intelligence**: Complete subnet rankings, validators, and emissions via TAOStats
- **Redis Caching**: 30s price cache, 60s subnet cache, 5m marketcap cache
- **PostgreSQL Database**: User staking positions, transaction history, wallet verification
- **Async API**: Fast endpoints with httpx async HTTP client
- **CORS Ready**: Configured for local dev and production deployment
- **Health Checks**: Built-in service health monitoring

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Setup PostgreSQL

```bash
# Create database
createdb deai_db

# Run with default PostgreSQL on localhost
```

### 4. Setup Redis

```bash
# Start Redis server (or use Docker)
redis-server
```

### 5. Run Backend

```bash
# Development with hot reload
python main.py

# Production with Uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /health` - Service status and dependency health

### TAO Price & Market Data
- `GET /api/tao/price` - Current TAO price (30s cache)
- `GET /api/tao/marketcap` - Market cap data (5m cache)
- `GET /api/dashboard` - Complete dashboard data (aggregated)

### Subnet Data
- `GET /api/subnets` - All subnets list (60s cache)
- `GET /api/subnets/{subnet_id}` - Specific subnet details
- `GET /api/validators` - All validators (60s cache)
- `GET /api/emissions` - Emissions data (60s cache)

### User Staking
- `GET /api/staking/positions/{address}` - User staking positions
- `GET /api/staking/history/{address}` - User transaction history

## Project Structure

```
backend/
├── main.py                 # FastAPI application & endpoints
├── requirements.txt        # Python dependencies
├── .env.example           # Configuration template
├── services/
│   ├── __init__.py
│   ├── cache.py          # Redis cache service
│   ├── coingecko.py      # CoinGecko API client
│   ├── taostats.py       # TAOStats API client
│   └── database.py       # PostgreSQL models & ORM
└── README.md
```

## Service Architecture

### CacheService (Redis)
- Handles all caching with JSON serialization
- 30s TTL for price data
- 60s TTL for subnet/validator lists
- 300s (5m) TTL for market cap

### CoinGeckoService
- Fetches live Bittensor price and market data
- No authentication required
- Fallback graceful degradation

### TAOStatsService
- Complete Bittensor network data
- Subnet rankings and validators
- Emissions and market metrics

### Database
- SQLAlchemy ORM with PostgreSQL
- Models: User, StakingPosition, Transaction, SubnetSnapshot
- Automatic table creation on startup

## Deployment

### Docker

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables Required

```
DATABASE_URL=postgresql://user:password@host:port/db
REDIS_URL=redis://host:port/0
FRONTEND_URL=https://yourdomain.com
ENV=production
```

### Render/Railway Deployment

1. Connect GitHub repository
2. Set environment variables
3. Deploy with: `uvicorn main:app --host 0.0.0.0 --port 8000`

## Development

### Auto-reload with file watching
```bash
python main.py  # ENV=development
```

### Testing endpoints locally
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/tao/price
curl http://localhost:8000/api/subnets
```

### Debugging logs
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Database Migrations

Using SQLAlchemy Core (auto-create) - for production, consider Alembic:

```bash
pip install alembic
alembic init migrations
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```

## Performance Tuning

- Redis significantly improves API response times
- Parallel queries using asyncio.gather()
- Connection pooling with SQLAlchemy
- httpx async HTTP client for external APIs

## Troubleshooting

### Redis connection failed
- Ensure Redis is running: `redis-cli ping`
- Check REDIS_URL in .env
- Caching gracefully disables if Redis unavailable

### PostgreSQL connection failed
- Verify database exists: `psql -l`
- Check DATABASE_URL format
- Ensure user has permissions

### API timeouts
- Check external service availability (CoinGecko, TAOStats)
- Increase timeout in service clients (currently 10s)
- Verify network connectivity

## Next Steps

1. Deploy backend to Render/Railway
2. Update FRONTEND_URL in environment
3. Connect frontend API calls to production endpoints
4. Setup database backups and monitoring
5. Add WebSocket support for real-time updates
6. Implement wallet signature verification with web3.py
7. Add user authentication and JWT tokens

## Support

For issues or questions:
- Check FastAPI docs: https://fastapi.tiangolo.com
- TAOStats API: https://api.taostats.io
- CoinGecko API: https://www.coingecko.com/api/documentations/v3
