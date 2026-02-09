# 🚀 Deployment Guide

Deploy DeAI to production across Vercel (frontend) + Render (backend).

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
cd /home/ciarrai/Documents/DeAI
git add -A
git commit -m "Ready for production"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects Vite configuration
5. Click "Deploy"

### Step 3: Set Environment Variables

In Vercel Project Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.render.com/api
```

### Step 4: Redeploy

After setting env vars, trigger a redeploy:
```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

Your frontend is now live at: `https://<project>.vercel.app`

---

## Backend Deployment (Render)

### Step 1: Prepare Backend Files

Make sure `.env` is NOT in git (it has secrets):

```bash
# In backend/.gitignore, ensure:
.env
*.sqlite
__pycache__/
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign in with GitHub
3. Create new account if needed

### Step 3: Create PostgreSQL Database

1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Name: `deai-postgres`
4. Plan: "Free" (or paid for production)
5. Click "Create Database"
6. Note the connection string

### Step 4: Create Redis Cache

1. Click "New +"
2. Select "Redis"
3. Name: `deai-redis`
4. Plan: "Free"
5. Click "Create Redis"
6. Note the connection URL

### Step 5: Deploy Backend Service

1. Click "New +"
2. Select "Web Service"
3. Connect GitHub repository
4. Select repository
5. Basic Settings:
   - **Name**: `deai-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3.10`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 6: Set Environment Variables

In Render Service Settings → Environment:

```
ENV=production
DATABASE_URL=<PostgreSQL connection string from Step 3>
REDIS_URL=<Redis connection URL from Step 4>
FRONTEND_URL=https://<your-vercel-app>.vercel.app
PORT=10000
```

### Step 7: Deploy

Click "Create Web Service" to deploy.

Render will automatically build and deploy your backend.

Your backend is now live at: `https://deai-backend.onrender.com`

---

## Alternative: Deploy Backend to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign in with GitHub

### Step 2: Create New Project

1. Click "New Project"
2. Select "GitHub Repo"
3. Choose your repository

### Step 3: Add PostgreSQL Plugin

1. In project dashboard, click "Add"
2. Select "PostgreSQL"
3. Railway auto-provisions database

### Step 4: Add Redis Plugin

1. Click "Add"
2. Select "Redis"
3. Railway auto-provisions cache

### Step 5: Deploy Backend Service

1. Create `railway.json` (or use Railway CLI)
2. Set environment variables in Railway dashboard
3. Railway detects `requirements.txt` automatically

Your backend lives at URL from Railway dashboard.

---

## Database Setup (Supabase Alternative)

Instead of Render PostgreSQL, use Supabase (free tier):

1. Go to https://supabase.com
2. Sign up / log in
3. Create new project
4. Get connection string from settings
5. Use in `DATABASE_URL` environment variable

Supabase provides PostgreSQL + Auth + Real-time features.

---

## Connecting Frontend to Backend

After both services are deployed:

### Frontend Environment Variable

Set in Vercel Project Settings:
```
VITE_API_URL=https://deai-backend.onrender.com/api
```

Or in Railway:
```
VITE_API_URL=https://<your-railway-backend-url>/api
```

### Test Connection

```bash
# From frontend logs, check for successful API calls
curl https://deai-backend.onrender.com/health
# Should return: {"status": "ok", ...}

# From frontend, check network tab for API calls
# Should see successful responses from /api/tao/price, etc.
```

---

## Domain Setup (Optional)

### Custom Domain on Vercel

1. In Vercel project settings
2. Add custom domain
3. Update DNS records as instructed
4. Auto-generates SSL certificate

### Custom Domain on Render

1. In Render service settings
2. Add custom domain
3. Update DNS records
4. Auto-generates SSL certificate

---

## Monitoring & Debugging

### Vercel Logs

```bash
# View build logs
vercel logs [project-name]

# View runtime logs
vercel logs [project-name] --follow
```

### Render Logs

1. Go to Render dashboard
2. Select service
3. Click "Logs" tab
4. Tail logs in real-time

### Railway Logs

1. Click service in dashboard
2. Select "Logs" tab
3. View deployment and runtime logs

---

## Environment Variables by Service

### Frontend (Vercel)
```
VITE_API_URL=https://deai-backend.onrender.com/api
```

### Backend (Render/Railway)
```
ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://user:pass@host:6379/0
FRONTEND_URL=https://deai.vercel.app
PORT=10000
```

### Secrets (Never in Git)
- Database passwords
- Redis URL
- API keys
- Private environment variables

These go in service provider's env var UI, never in `.env` file.

---

## Security Checklist

- [ ] `FRONTEND_URL` in backend matches actual frontend URL
- [ ] `DATABASE_URL` uses strong password
- [ ] Redis requires authentication
- [ ] CORS configured for frontend domain only
- [ ] SSL/HTTPS enforced
- [ ] Environment variables don't leak in logs
- [ ] `.env` file in `.gitignore`
- [ ] Secrets manager used for sensitive data
- [ ] Database backups enabled
- [ ] Rate limiting configured (if needed)

---

## Scaling Tips

### Frontend (Vercel)
- Already globally distributed
- No additional scaling needed
- Auto-scales with traffic

### Backend (Render/Railway)
- Scale up from "Free" to "Paid" tier for better performance
- Add more CPU/RAM as traffic increases
- Consider multi-instance deployment
- Load balancing auto-configured

### Database (PostgreSQL)
- Start with free tier for testing
- Scale to paid for production
- Enable backups and replication
- Monitor query performance

### Cache (Redis)
- Free tier fine for development
- Scale up for high-traffic scenarios
- Eviction policies auto-configured
- Monitor memory usage

---

## Troubleshooting Deployment

### "Frontend can't reach backend"
1. Check `VITE_API_URL` is set correctly
2. Verify backend URL is accessible
3. Check CORS configuration in backend
4. Verify network connectivity

### "Database connection failed"
1. Verify `DATABASE_URL` is correct
2. Check PostgreSQL service is running
3. Verify network access rules
4. Test connection manually with `psql`

### "Redis connection timeout"
1. Check `REDIS_URL` is correct
2. Verify Redis service is running
3. Check network firewall rules
4. Test with `redis-cli` command

### "Vercel build fails"
1. Check build logs for errors
2. Verify `package.json` is correct
3. Ensure all dependencies installed
4. Check Node version compatibility

### "Render deployment times out"
1. Check `requirements.txt` for issues
2. Verify Python version is 3.10+
3. Check start command is correct
4. Increase deploy timeout settings

---

## Cost Summary

### Free Tier
- **Vercel Frontend**: Free (14 GB bandwidth/mo)
- **Render PostgreSQL**: Free 
- **Render Redis**: Free
- **Render Backend**: $7/month (5GB RAM)
- **Total**: ~$7/month

### Production Tier
- **Vercel Pro**: $20/month
- **Render PostgreSQL**: $12/month (20GB)
- **Render Redis**: $6/month
- **Render Backend**: $7/month (basic) to $58/month (high)
- **Total**: $45-$96/month

---

## Maintenance

### Regular Tasks
- Monitor error logs
- Review performance metrics
- Update dependencies monthly
- Test disaster recovery
- Review and rotate secrets

### Deployment Process
1. Test locally: `npm run dev` + `python main.py`
2. Commit to git: `git push origin main`
3. Vercel auto-deploys frontend
4. Update backend environment if needed
5. Render auto-deploys backend
6. Verify at `https://your-domain.com`

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Supabase Docs**: https://supabase.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

**Ready to ship to production! 🚀**

```bash
# Final check
cd /home/ciarrai/Documents/DeAI
npm run build  # Should succeed
git push       # Triggers Vercel deploy

# Backend deploys automatically from git
# Check Render dashboard for status
```
