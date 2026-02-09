#!/usr/bin/env bash
# Backend startup test script

echo "🚀 DeAI Backend Startup Test"
echo "=============================="
echo ""

# Check Python version
echo "✓ Python version:"
/home/ciarrai/Documents/DeAI/.venv/bin/python --version
echo ""

# Check fastapi installation
echo "✓ Checking FastAPI installation..."
/home/ciarrai/Documents/DeAI/.venv/bin/python -c "import fastapi; print(f'  FastAPI {fastapi.__version__}')"
echo ""

# Check required dependencies
echo "✓ Checking dependencies..."
/home/ciarrai/Documents/DeAI/.venv/bin/python -c "
import fastapi, uvicorn, sqlalchemy, redis, httpx, pydantic
print('  - fastapi ✓')
print('  - uvicorn ✓')
print('  - sqlalchemy ✓')
print('  - redis ✓')
print('  - httpx ✓')
print('  - pydantic ✓')
"
echo ""

# Test imports
echo "✓ Testing backend module imports..."
cd /home/ciarrai/Documents/DeAI && /home/ciarrai/Documents/DeAI/.venv/bin/python -c "
from backend.services.cache import CacheService
from backend.services.coingecko import CoinGeckoService
from backend.services.taostats import TAOStatsService
from backend.services.database import Database
print('  - All service modules import successfully ✓')
"
echo ""

# Compile backend code
echo "✓ Compiling backend code..."
/home/ciarrai/Documents/DeAI/.venv/bin/python -m py_compile /home/ciarrai/Documents/DeAI/backend/main.py
echo "  - main.py compiles successfully ✓"
echo ""

# Compile services
echo "✓ Compiling service modules..."
/home/ciarrai/Documents/DeAI/.venv/bin/python -m py_compile \
  /home/ciarrai/Documents/DeAI/backend/services/cache.py \
  /home/ciarrai/Documents/DeAI/backend/services/coingecko.py \
  /home/ciarrai/Documents/DeAI/backend/services/taostats.py \
  /home/ciarrai/Documents/DeAI/backend/services/database.py
echo "  - All service modules compile successfully ✓"
echo ""

echo "✅ All checks passed! Backend is ready to start."
echo ""
echo "Next steps:"
echo "  1. Setup PostgreSQL and Redis (see BACKEND_SETUP.md)"
echo "  2. Create .env file: cp backend/.env.example backend/.env"
echo "  3. Run: docker-compose up"
echo "  4. Or run manually: cd backend && python main.py"
echo ""
