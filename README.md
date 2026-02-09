# 🚀 DeAI - Institutional Bittensor Staking Platform

Professional web3 platform for subnet staking, portfolio management, and TAO market intelligence.

## 📋 Documentation

- **[Quick Start](QUICK_START.md)** - Get running in 5 minutes
- **[Project Status](PROJECT_STATUS.md)** - Complete architecture overview
- **[Backend Setup](BACKEND_SETUP.md)** - Detailed backend configuration
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to production

## ⚡ Quick Start

```bash
# Clone and install
cd /home/ciarrai/Documents/DeAI
npm install

# Start everything with Docker (recommended)
docker-compose up

# Or start manually
npm run dev              # Terminal 1: Frontend
python backend/main.py  # Terminal 2: Backend

# Open browser
open http://localhost:5173
```

## 🎯 Key Features

### 💼 Portfolio Dashboard
- View staking positions across subnets
- Track earnings and APY
- Transaction history
- Real-time balance display

### 🔐 Wallet Integration
- Connect via RainbowKit (MetaMask, WalletConnect, etc.)
- View wallet balance
- See TAO price and market data
- Protected routes with wallet auth

### 📊 Analytics Dashboard
- Live TAO price with 24h change
- Subnet rankings and emissions
- Validator performance metrics
- Network intelligence

### 🎨 Beautiful UI
- Black & white professional theme
- Responsive design (mobile-friendly)
- Dark mode optimized
- Smooth animations

## 🏗️ Architecture

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **RainbowKit** + **Wagmi** for Web3
- **TanStack Query** for data fetching
- **Tailwind CSS** for styling

### Backend
- **FastAPI** - Modern async API
- **PostgreSQL** - Data persistence
- **Redis** - Caching layer
- **SQLAlchemy** - ORM
- **CoinGecko + TAOStats** - External APIs

## 📁 Project Structure

```
DeAI/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx      # Analytics with live TAO price
│   │   ├── Portfolio.jsx      # Staking positions & history
│   │   ├── Wallet.jsx         # Wallet details & TAO price
│   │   └── [other pages]      # Statistics, Scoring, etc.
│   ├── components/
│   │   ├── Navbar.jsx         # Top nav + wallet button
│   │   └── Sidebar.jsx        # Left nav for app routes
│   ├── api/client.js          # API client with all endpoints
│   └── App.jsx                # Router & providers
│
├── backend/
│   ├── main.py                # FastAPI endpoints
│   ├── services/
│   │   ├── cache.py           # Redis caching
│   │   ├── coingecko.py       # Price data
│   │   ├── taostats.py        # Network data
│   │   └── database.py        # PostgreSQL models
│   └── requirements.txt        # Python dependencies
│
├── docker-compose.yml         # Local dev environment
└── Dockerfile                 # Backend container
```

## 🔌 API Endpoints

### Price Data
- `GET /api/tao/price` - Current TAO price (30s cache)
- `GET /api/tao/marketcap` - Market cap data (5m cache)
- `GET /api/dashboard` - Complete dashboard snapshot

### Subnet Data
- `GET /api/subnets` - All subnets (60s cache)
- `GET /api/subnets/{id}` - Specific subnet details
- `GET /api/validators` - All validators
- `GET /api/emissions` - Emissions data

### User Staking
- `GET /api/staking/positions/{address}` - Your staking positions
- `GET /api/staking/history/{address}` - Your transaction history

## 🧪 Testing

```bash
# Test backend
bash test-backend.sh

# Test frontend build
bash test-frontend.sh

# Manual API testing
curl http://localhost:8000/health
curl http://localhost:8000/api/tao/price
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on git push

### Backend (Render/Railway)
1. Set up PostgreSQL & Redis
2. Deploy Docker container
3. Set environment variables
4. Auto-deploys on git push

See [Deployment Guide](DEPLOYMENT.md) for detailed steps.

## 🔒 Environment Variables

### Frontend
```
VITE_API_URL=http://localhost:8000/api
```

### Backend
```
ENV=development
DATABASE_URL=postgresql://user:pass@localhost/db
REDIS_URL=redis://localhost:6379/0
FRONTEND_URL=http://localhost:5173
PORT=8000
```

## 📊 Tech Stack

### Frontend
- React 18.2
- Vite 5.0
- React Router 6.21
- RainbowKit 2.1
- Wagmi 2.6
- TanStack Query 5
- Tailwind CSS 3.3
- Chart.js 4.5

### Backend
- FastAPI 0.109
- Uvicorn 0.27
- SQLAlchemy 2.0
- PostgreSQL 15+
- Redis 7+
- Web3.py 6.11
- PyCoingecko 3.1

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [RainbowKit Docs](https://www.rainbowkit.com)
- [Wagmi Docs](https://wagmi.sh)
- [Tailwind CSS](https://tailwindcss.com)

## 📝 Development Workflow

1. **Local Development**
   ```bash
   npm run dev              # Frontend with hot reload
   python backend/main.py   # Backend with auto-reload
   ```

2. **Make Changes**
   - Edit files in `src/pages/` or `backend/`
   - Changes auto-reload instantly

3. **Test**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000/docs

4. **Commit & Push**
   ```bash
   git add -A
   git commit -m "feat: description"
   git push origin main
   ```

5. **Deploy**
   - Vercel auto-deploys frontend on git push
   - Render/Railway auto-deploys backend on git push

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Make sure backend is running: `python backend/main.py`
- Check `VITE_API_URL` environment variable
- Verify CORS is enabled in backend

### "Wallet won't connect"
- Make sure you have a Web3 wallet installed
- Try refreshing the page
- Check browser console for errors

### "Port already in use"
- Kill existing process: `lsof -i :8000`
- Or use different port: `npm run dev -- --port 3000`

### "Database connection failed"
- Make sure PostgreSQL is running
- Check `DATABASE_URL` is correct
- With Docker: ensure `docker-compose up` includes postgres

## 📞 Support

- [GitHub Issues](https://github.com/yourusername/deai/issues)
- [Discord Community](https://discord.gg/bittensor)
- [Bittensor Docs](https://docs.bittensor.com)

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 🎯 Roadmap

- [x] Frontend with React Router
- [x] RainbowKit wallet integration
- [x] Backend with FastAPI
- [x] Redis caching
- [x] PostgreSQL database
- [ ] User authentication (JWT)
- [ ] Transaction signing
- [ ] WebSocket real-time updates
- [ ] Advanced analytics
- [ ] Staking simulation
- [ ] Mobile app (React Native)

---

**Ready to stake? Get started with [Quick Start](QUICK_START.md)** 🚀

```bash
docker-compose up   # All systems go!
```
