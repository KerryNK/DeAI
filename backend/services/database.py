"""
Database Service
PostgreSQL integration with SQLAlchemy
"""

import os
import logging
from sqlalchemy import create_engine, Column, String, Float, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

logger = logging.getLogger(__name__)

Base = declarative_base()

# ============================================
# DATABASE MODELS
# ============================================

class User(Base):
    """User model for wallet addresses"""
    __tablename__ = "users"
    
    address = Column(String, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AuthUser(Base):
    """Authenticated user model for email/password login"""
    __tablename__ = "auth_users"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

class StakingPosition(Base):
    """Staking position model"""
    __tablename__ = "staking_positions"
    
    id = Column(Integer, primary_key=True)
    user_address = Column(String, nullable=False)
    subnet_id = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)
    apy = Column(Float, nullable=False)
    earnings = Column(Float, default=0.0)
    status = Column(String, default="active")  # active, inactive, completed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Transaction(Base):
    """Transaction history model"""
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True)
    user_address = Column(String, nullable=False)
    transaction_type = Column(String, nullable=False)  # stake, unstake, harvest
    subnet_id = Column(Integer, nullable=False)
    amount = Column(Float, nullable=False)
    hash = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending, confirmed, failed
    timestamp = Column(DateTime, default=datetime.utcnow)

class SubnetSnapshot(Base):
    """Subnet data snapshots for historical tracking"""
    __tablename__ = "subnet_snapshots"
    
    id = Column(Integer, primary_key=True)
    subnet_id = Column(Integer, nullable=False)
    emissions = Column(Float, nullable=False)
    total_validators = Column(Integer, nullable=False)
    total_neurons = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

# ============================================
# DATABASE SERVICE
# ============================================

class Database:
    """Database service for PostgreSQL operations"""
    
    def __init__(self):
        """Initialize database connection"""
        db_url = os.getenv(
            "DATABASE_URL",
            "postgresql://localhost/deai_db"
        )
        
        try:
            self.engine = create_engine(
                db_url,
                echo=os.getenv("ENV") == "development",
                pool_pre_ping=True,
            )
            self.SessionLocal = sessionmaker(bind=self.engine)
            
            # Create tables
            Base.metadata.create_all(self.engine)
            logger.info("Database connection established")
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            self.engine = None
            self.SessionLocal = None
    
    def get_session(self):
        """Get database session"""
        if not self.SessionLocal:
            return None
        return self.SessionLocal()
    
    def get_user(self, address: str) -> User:
        """Get or create user"""
        session = self.get_session()
        if not session:
            return None
        
        try:
            user = session.query(User).filter_by(address=address).first()
            if not user:
                user = User(address=address)
                session.add(user)
                session.commit()
            return user
        except Exception as e:
            logger.error(f"Error getting user {address}: {e}")
            session.rollback()
            return None
        finally:
            session.close()
    
    def get_user_staking_positions(self, address: str) -> list:
        """Get all staking positions for a user"""
        session = self.get_session()
        if not session:
            return []
        
        try:
            positions = session.query(StakingPosition).filter_by(
                user_address=address
            ).all()
            return [
                {
                    "id": p.id,
                    "subnet_id": p.subnet_id,
                    "amount": p.amount,
                    "apy": p.apy,
                    "earnings": p.earnings,
                    "status": p.status,
                    "created_at": p.created_at.isoformat(),
                }
                for p in positions
            ]
        except Exception as e:
            logger.error(f"Error fetching positions for {address}: {e}")
            return []
        finally:
            session.close()
    
    def add_staking_position(self, address: str, subnet_id: int, amount: float, apy: float):
        """Add a new staking position"""
        session = self.get_session()
        if not session:
            return False
        
        try:
            self.get_user(address)  # Ensure user exists
            
            position = StakingPosition(
                user_address=address,
                subnet_id=subnet_id,
                amount=amount,
                apy=apy,
            )
            session.add(position)
            session.commit()
            return True
        except Exception as e:
            logger.error(f"Error adding staking position: {e}")
            session.rollback()
            return False
        finally:
            session.close()
    
    def get_user_transaction_history(self, address: str, limit: int = 50) -> list:
        """Get transaction history for a user"""
        session = self.get_session()
        if not session:
            return []
        
        try:
            transactions = session.query(Transaction).filter_by(
                user_address=address
            ).order_by(Transaction.timestamp.desc()).limit(limit).all()
            
            return [
                {
                    "id": t.id,
                    "type": t.transaction_type,
                    "subnet_id": t.subnet_id,
                    "amount": t.amount,
                    "status": t.status,
                    "timestamp": t.timestamp.isoformat(),
                    "hash": t.hash,
                }
                for t in transactions
            ]
        except Exception as e:
            logger.error(f"Error fetching transactions for {address}: {e}")
            return []
        finally:
            session.close()
    
    def add_transaction(self, address: str, tx_type: str, subnet_id: int, amount: float, tx_hash: str = None) -> bool:
        """Add a transaction"""
        session = self.get_session()
        if not session:
            return False
        
        try:
            self.get_user(address)  # Ensure user exists
            
            transaction = Transaction(
                user_address=address,
                transaction_type=tx_type,
                subnet_id=subnet_id,
                amount=amount,
                hash=tx_hash,
            )
            session.add(transaction)
            session.commit()
            return True
        except Exception as e:
            logger.error(f"Error adding transaction: {e}")
            session.rollback()
            return False
        finally:
            session.close()
    
    # ============================================
    # AUTHENTICATION USER METHODS
    # ============================================
    
    async def create_user(self, email: str, password_hash: str, username: str):
        """Create a new authenticated user"""
        session = self.get_session()
        if not session:
            return None
        
        try:
            user = AuthUser(
                email=email,
                username=username,
                password_hash=password_hash
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            
            return {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "created_at": user.created_at.isoformat()
            }
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            session.rollback()
            return None
        finally:
            session.close()
    
    async def get_user_by_email(self, email: str):
        """Get user by email"""
        session = self.get_session()
        if not session:
            return None
        
        try:
            user = session.query(AuthUser).filter_by(email=email).first()
            if not user:
                return None
            
            return {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "password_hash": user.password_hash,
                "created_at": user.created_at.isoformat(),
                "last_login": user.last_login.isoformat() if user.last_login else None
            }
        except Exception as e:
            logger.error(f"Error getting user by email: {e}")
            return None
        finally:
            session.close()
    
    async def get_user_by_id(self, user_id: int):
        """Get user by ID"""
        session = self.get_session()
        if not session:
            return None
        
        try:
            user = session.query(AuthUser).filter_by(id=user_id).first()
            if not user:
                return None
            
            return {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "created_at": user.created_at.isoformat(),
                "last_login": user.last_login.isoformat() if user.last_login else None
            }
        except Exception as e:
            logger.error(f"Error getting user by ID: {e}")
            return None
        finally:
            session.close()
    
    async def update_last_login(self, user_id: int):
        """Update user's last login timestamp"""
        session = self.get_session()
        if not session:
            return False
        
        try:
            user = session.query(AuthUser).filter_by(id=user_id).first()
            if user:
                user.last_login = datetime.utcnow()
                session.commit()
                return True
            return False
        except Exception as e:
            logger.error(f"Error updating last login: {e}")
            session.rollback()
            return False
        finally:
            session.close()
    
    def close(self):
        """Close database connection"""
        if self.engine:
            self.engine.dispose()
            logger.info("Database connection closed")
