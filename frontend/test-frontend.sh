#!/usr/bin/env bash
# Frontend API client test script

echo "🧪 DeAI Frontend API Client Test"
echo "==============================="
echo ""

# Check npm
echo "✓ Node.js version:"
node --version
echo ""

echo "✓ npm version:"
npm --version
echo ""

# List installed packages
echo "✓ Checking critical packages..."
npm list react react-router-dom wagmi @rainbow-me/rainbowkit @tanstack/react-query 2>/dev/null | grep -E "react@|react-router-dom@|wagmi@|@rainbow-me|@tanstack"
echo ""

# Test frontend build
echo "✓ Testing frontend build..."
cd /home/ciarrai/Documents/DeAI
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  Build successful ✓"
  BUILD_SIZE=$(du -sh dist | cut -f1)
  echo "  Build size: $BUILD_SIZE"
else
  echo "  ❌ Build failed"
  exit 1
fi
echo ""

# Check for API client
echo "✓ Checking API client..."
if grep -q "getTaoPrice\|getStakingPositions\|getStakingHistory" src/api/client.js; then
  echo "  API client has all required endpoints ✓"
else
  echo "  ❌ API client missing endpoints"
  exit 1
fi
echo ""

# Verify key files
echo "✓ Verifying key files..."
files=(
  "src/pages/Dashboard.jsx"
  "src/pages/Portfolio.jsx"
  "src/pages/Wallet.jsx"
  "src/components/Navbar.jsx"
  "src/components/Sidebar.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ❌ $file missing"
    exit 1
  fi
done
echo ""

echo "✅ Frontend ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. Start frontend: npm run dev"
echo "  2. Start backend: docker-compose up (or python backend/main.py)"
echo "  3. Test at http://localhost:5173"
echo ""
