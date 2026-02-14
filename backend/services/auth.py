"""
Authentication Service
Handles user authentication, JWT tokens, and password hashing
"""

import jwt
import bcrypt
from datetime import datetime, timedelta
from typing import Optional, Dict
import os
from dotenv import load_dotenv

load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

class AuthService:
    """Service for handling authentication operations"""
    
    def __init__(self, db):
        """Initialize auth service with database connection"""
        self.db = db
    
    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    def verify_password(self, password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        return bcrypt.checkpw(
            password.encode('utf-8'),
            hashed_password.encode('utf-8')
        )
    
    def create_access_token(self, data: dict) -> str:
        """Create a JWT access token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def verify_token(self, token: str) -> Optional[Dict]:
        """Verify and decode a JWT token"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    async def create_user(self, email: str, password: str, username: str) -> Dict:
        """Create a new user account"""
        # Check if user already exists
        existing_user = await self.db.get_user_by_email(email)
        if existing_user:
            raise ValueError("User with this email already exists")
        
        # Hash password
        hashed_password = self.hash_password(password)
        
        # Create user in database
        user = await self.db.create_user(
            email=email,
            password_hash=hashed_password,
            username=username
        )
        
        return user
    
    async def authenticate_user(self, email: str, password: str) -> Optional[Dict]:
        """Authenticate a user with email and password"""
        # Get user from database
        user = await self.db.get_user_by_email(email)
        if not user:
            return None
        
        # Verify password
        if not self.verify_password(password, user['password_hash']):
            return None
        
        # Update last login
        await self.db.update_last_login(user['id'])
        
        return user
    
    async def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """Get user by ID"""
        return await self.db.get_user_by_id(user_id)
