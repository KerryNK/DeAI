    #!/bin/bash
set -e

# Clear Rust cache to avoid read-only filesystem issues
export CARGO_NET_OFFLINE=true

# Install backend dependencies from wheels only (pre-built)
pip install --only-binary=:all: -r backend/requirements.txt 2>/dev/null || {
  # Fallback: install without pre-built wheel requirement
  pip install -r backend/requirements.txt
}

# Install frontend dependencies and build
cd frontend
npm install
npm run build
cd ..
