# 🚀 DeAI Quick Start Guide

Get the institutional Bittensor staking platform running in 5 minutes.

## Prerequisites

- **Node.js 18+** - `node --version`
- **Python 3.10+** - `python3 --version`
- **Docker & Docker Compose** (optional but recommended)
- **Git** - For cloning and commits

## Option 1: Full Stack with Docker (Easiest)

### 1. Start Everything

```bash
cd /home/ciarrai/Documents/DeAI
docker-compose up
```

This automatically starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **PostgreSQL**: localhost:5432 (user: deai_user, pass: deai_password)
- **Redis**: localhost:6379

### 2. Test the System

```bash
# In another terminal, test backend endpoints
curl http://localhost:8000/health
curl http://localhost:8000/api/tao/price

# Or just open http://localhost:5173 in your browser
```

### 3. Connect Your Wallet

- Go to http://localhost:5173
- Click "Connect Wallet" button in top-right
- Select your Web3 wallet (MetaMask, WalletConnect, etc.)
- Navigate to `/app/dashboard` to see your portfolio

## Option 2: Frontend Only (No Docker)

### 1. Start Frontend Dev Server

```bash
cd /home/ciarrai/Documents/DeAI
npm install  # First time only
npm run dev
```

Frontend available at http://localhost:5173

### 2. API will fallback to mock data

Since backend isn't running, the app uses mock data but still connects your wallet.

## Option 3: Backend Only (Testing APIs)

### 1. Setup Environment

```bash
cd /home/ciarrai/Documents/DeAI/backend
cp .env.example .env

# Edit .env with your settings, or use defaults
# The backend will work without Redis/PostgreSQL (with limitations)
```

### 2. Start Backend

```bash
# Using Python
python main.py

# Or with Uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Test Endpoints

```bash
# Health check
curl http://localhost:8000/health

# Get TAO price (from CoinGecko)
curl http://localhost:8000/api/tao/price

# Get all subnets (from TAOStats)
curl http://localhost:8000/api/subnets

# Get dashboard data (aggregated)
curl http://localhost:8000/api/dashboard
```

## Verify Installation

Run automatic tests to verify everything is installed correctly:

```bash
# Test backend
bash /home/ciarrai/Documents/DeAI/test-backend.sh

# Test frontend (builds and checks structure)
bash /home/ciarrai/Documents/DeAI/test-frontend.sh
```

## Project Structure

```
DeAI/
├── frontend (React + Vite)
│   ├── src/pages/         → Dashboard, Portfolio, Wallet pages
│   ├── src/components/    → Navbar, Sidebar with RainbowKit
│   ├── src/api/client.js  → API endpoints
│   └── npm run dev        → Start frontend
│
├── backend (FastAPI + Python)
│   ├── main.py            → API endpoints
│   ├── services/          → Cache, Price, Subnets, Database
│   ├── requirements.txt    → Python dependencies
│   └── python main.py     → Start backend
│
├── docker-compose.yml     → Local dev environment
└── BACKEND_SETUP.md       → Detailed backend guide
```

## Key Features

### ✅ Frontend
- React Router with 7 routes
- RainbowKit wallet integration
- Live TAO price updates
- Staking portfolio dashboard
- Transaction history
- Black & white theme with accent colors

### ✅ Backend
- FastAPI with async endpoints
- Redis caching (30s/60s/300s TTLs)
- PostgreSQL database models
- CoinGecko price integration
- TAOStats subnet intelligence
- Graceful error handling

### ✅ Developer Experience
- Hot reload on file changes
- Comprehensive error messages
- Mock data fallback
- Automatic database creation
- Docker support for easy setup

## Common Tasks

### Connect to Different Network

In `src/App.jsx`, change the wallet configuration:

```javascript
// Currently: Ethereum Mainnet
// To change: Modify RainbowKit chains config
```

### Change API Server

In `src/api/client.js`:
```javascript
const API_BASE_URL = 'https://your-backend.com/api';
```

Or set environment variable:
```bash
export VITE_API_URL=https://your-backend.com/api
npm run dev
```

### Add New Page

1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
```javascript
<Route path="/app/newpage" element={<NewPage />} />
```
3. Add link in `src/components/Sidebar.jsx`

### Debug API Calls

Open browser dev tools (F12):
- Network tab shows all API requests
- Console shows error messages
- React Developer Tools shows component state

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173 (frontend)
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

### Redis Connection Failed
```bash
# Make sure Redis is running
redis-cli ping

# Or start with Docker
docker-compose up redis
```

### PostgreSQL Connection Failed
```bash
# Make sure PostgreSQL is running
psql -U deai_user -d deai_db

# Or start with Docker
docker-compose up postgres
```

### Wallet Not Connecting
1. Make sure you have a Web3 wallet installed (MetaMask, WalletConnect)
2. Try refreshing the page (F5)
3. Check browser console for errors (F12)
4. Make sure you're on a supported network

### API Returns 500 Error
- Check backend logs for error messages
- Verify external APIs are working (CoinGecko, TAOStats)
- Try restarting backend: `python main.py`

## Next Steps

1. **Local Development**
   - Modify pages in `src/pages/`
   - Update API client in `src/api/client.js`
   - Changes auto-reload with `npm run dev`

2. **Deploy Frontend**
   - Push to GitHub
   - Connect to Vercel
   - Auto-deploys on push

3. **Deploy Backend**
   - Push to GitHub
   - Connect to Render or Railway
   - Set environment variables
   - Auto-deploys on push

4. **Connect Production**
   - Update `VITE_API_URL` to production backend
   - Deploy frontend with new env var
   - Test all endpoints

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api  # Local dev
# VITE_API_URL=https://api.yourdomain.com  # Production
```

### Backend (.env)
```
ENV=development
DATABASE_URL=postgresql://user:pass@localhost/db
REDIS_URL=redis://localhost:6379/0
FRONTEND_URL=http://localhost:5173
PORT=8000
```

## Support Resources

- **Frontend Docs**: https://react.dev
- **Backend Docs**: https://fastapi.tiangolo.com
- **Wallet**: https://www.rainbowkit.com
- **Blockchain**: https://wagmi.sh
- **APIs**: 
  - TAOStats: https://api.taostats.io
  - CoinGecko: https://coingecko.com/api

## Production Deployment Checklist

- [ ] Backend deployed to Render/Railway
- [ ] PostgreSQL setup on Supabase/Railway
- [ ] Redis setup on Upstash
- [ ] Backend environment variables configured
- [ ] Frontend environment variable set to production API
- [ ] Frontend deployed to Vercel
- [ ] CORS configured for production domain
- [ ] SSL/HTTPS enabled
- [ ] Monitoring and error tracking setup
- [ ] Database backups configured

## Quick Commands Reference

```bash
# Development
npm run dev              # Start frontend
python main.py          # Start backend
docker-compose up       # Start all services

# Building
npm run build           # Build frontend for production
npm run preview         # Preview production build

# Testing
bash test-backend.sh    # Test backend dependencies
bash test-frontend.sh   # Test frontend build

# Cleanup
docker-compose down     # Stop all services
rm -rf node_modules     # Clean npm cache
rm -rf dist            # Clean build output
```

---

**You're all set! 🎉**

Start with: `docker-compose up`

Then open: http://localhost:5173

Questions? Check **BACKEND_SETUP.md** or **PROJECT_STATUS.md** for detailed docs.
