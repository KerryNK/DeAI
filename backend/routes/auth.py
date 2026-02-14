"""
Authentication endpoints
"""

from fastapi import Header, HTTPException
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
        # Create user
        user = await auth_service.create_user(
            email=request.email,
            password=request.password,
            username=request.username
        )
        
        if not user:
            raise HTTPException(status_code=400, detail="User creation failed")
        
        # Create JWT token
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
        # Authenticate user
        user = await auth_service.authenticate_user(request.email, request.password)
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Create JWT token
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
    
    # Create new token
    new_token = auth_service.create_access_token({"sub": payload["sub"], "email": payload["email"]})
    
    return {"token": new_token}
