from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import hashlib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# User Models
class SocialAccount(BaseModel):
    id: str
    name: str
    followers: int
    platform_url: str = ""

class ContactInfo(BaseModel):
    telegram: str = ""
    whatsapp: str = ""
    vk: str = ""

class PayoutInfo(BaseModel):
    method: str = "card"
    card_number: str = ""
    bank_name: str = ""
    account_holder: str = ""

class UserStats(BaseModel):
    followers: int = 0
    campaigns: int = 0
    earnings: str = "0 ₽"
    completed_campaigns: int = 0
    average_rating: float = 0.0
    total_views: int = 0
    total_engagement: int = 0

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    avatar: str = ""
    is_verified: bool = False
    social_accounts: List[SocialAccount] = []
    contact_info: ContactInfo = Field(default_factory=ContactInfo)
    payout_info: PayoutInfo = Field(default_factory=PayoutInfo)
    loyalty_points: int = 100
    stats: UserStats = Field(default_factory=UserStats)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone: str = ""
    social_accounts: List[SocialAccount] = []

class UserLogin(BaseModel):
    email: str
    password: str

# Campaign Models
class Campaign(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    brand: str
    reward: str
    deadline: str
    status: str = "available"  # available, applied, completed
    description: str
    requirements: str
    platforms: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Analytics Models
class CampaignMetric(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    campaign_id: str
    views: int = 0
    likes: int = 0
    comments: int = 0
    shares: int = 0
    ctr: float = 0.0
    engagement: float = 0.0
    earnings: int = 0
    rating: float = 0.0
    date: str
    platform: str

# Loyalty Transaction Models
class LoyaltyTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    points: int
    reason: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Helper functions
def prepare_for_mongo(data):
    """Convert Python objects to MongoDB-compatible format"""
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    """Convert MongoDB data back to Python objects"""
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, str) and 'T' in value:
                try:
                    item[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
                except:
                    pass
    return item

def hash_password(password: str) -> str:
    """Simple password hashing"""
    return hashlib.sha256(password.encode()).hexdigest()

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Ublogger API v1.0"}

# Authentication endpoints
@api_router.post("/auth/register", response_model=User)
async def register_user(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create new user
    user_dict = user_data.dict()
    user_dict["password"] = hash_password(user_dict["password"])
    
    # Calculate total reach
    total_reach = sum(account.followers for account in user_data.social_accounts)
    user_dict["stats"] = UserStats(
        followers=total_reach,
        campaigns=0,
        earnings="0 ₽",
        completed_campaigns=0,
        average_rating=0,
        total_views=0,
        total_engagement=0
    ).dict()
    
    user_obj = User(**user_dict)
    user_dict = prepare_for_mongo(user_obj.dict())
    
    await db.users.insert_one(user_dict)
    return user_obj

@api_router.post("/auth/login", response_model=User)
async def login_user(login_data: UserLogin):
    user_data = await db.users.find_one({"email": login_data.email})
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check password before parsing (password field exists in raw DB data)
    if user_data.get("password") != hash_password(login_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user_data = parse_from_mongo(user_data)
    # Remove password from response data for security
    user_data.pop("password", None)
    return User(**user_data)

# User profile endpoints
@api_router.get("/user/{user_id}", response_model=User)
async def get_user(user_id: str):
    user_data = await db.users.find_one({"id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = parse_from_mongo(user_data)
    return User(**user_data)

@api_router.put("/user/{user_id}", response_model=User)
async def update_user(user_id: str, updates: dict):
    # Update user data
    await db.users.update_one(
        {"id": user_id},
        {"$set": prepare_for_mongo(updates)}
    )
    
    updated_user = await db.users.find_one({"id": user_id})
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = parse_from_mongo(updated_user)
    return User(**updated_user)

# Campaigns endpoints
@api_router.get("/campaigns", response_model=List[Campaign])
async def get_campaigns():
    campaigns = await db.campaigns.find().to_list(1000)
    return [Campaign(**campaign) for campaign in campaigns]

@api_router.post("/campaigns", response_model=Campaign)
async def create_campaign(campaign_data: Campaign):
    campaign_dict = prepare_for_mongo(campaign_data.dict())
    await db.campaigns.insert_one(campaign_dict)
    return campaign_data

# Analytics endpoints
@api_router.get("/analytics/{user_id}")
async def get_user_analytics(user_id: str):
    # Get user's campaign metrics
    metrics = await db.campaign_metrics.find({"user_id": user_id}).to_list(1000)
    
    # Mock analytics data for now
    return {
        "earnings": [
            {"month": "янв", "earnings": 15000},
            {"month": "фев", "earnings": 22000},
            {"month": "мар", "earnings": 18000},
            {"month": "апр", "earnings": 35000},
            {"month": "май", "earnings": 28000},
            {"month": "июн", "earnings": 45000},
            {"month": "июл", "earnings": 52000}
        ],
        "campaigns": [
            {"month": "янв", "campaigns": 3},
            {"month": "фев", "campaigns": 5},
            {"month": "мар", "campaigns": 4},
            {"month": "апр", "campaigns": 8},
            {"month": "май", "campaigns": 6},
            {"month": "июн", "campaigns": 10},
            {"month": "июл", "campaigns": 12}
        ],
        "metrics": metrics
    }

# Loyalty points endpoints
@api_router.post("/loyalty/{user_id}/add")
async def add_loyalty_points(user_id: str, points: int, reason: str):
    # Add loyalty transaction
    transaction = LoyaltyTransaction(
        user_id=user_id,
        points=points,
        reason=reason
    )
    transaction_dict = prepare_for_mongo(transaction.dict())
    await db.loyalty_transactions.insert_one(transaction_dict)
    
    # Update user's loyalty points
    await db.users.update_one(
        {"id": user_id},
        {"$inc": {"loyalty_points": points}}
    )
    
    return {"message": f"Added {points} loyalty points for {reason}"}

@api_router.get("/loyalty/{user_id}/transactions")
async def get_loyalty_transactions(user_id: str):
    transactions = await db.loyalty_transactions.find({"user_id": user_id}).to_list(1000)
    return [LoyaltyTransaction(**transaction) for transaction in transactions]

# Status check endpoints (existing)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    # Add sample campaigns if none exist
    campaigns_count = await db.campaigns.count_documents({})
    if campaigns_count == 0:
        sample_campaigns = [
            {
                "id": str(uuid.uuid4()),
                "title": "Новая линейка российских смартфонов TechNova X1",
                "brand": "TechNova Russia",
                "reward": "15,000 ₽",
                "deadline": "15 фев 2025",
                "status": "available",
                "description": "Обзор новых функций смартфона для российской Tech-аудитории",
                "requirements": "Tech-блогеры с российской аудиторией 50K+",
                "platforms": ["youtube", "rutube"],
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Весенняя коллекция российского бренда FashionSpace",
                "brand": "FashionSpace РФ",
                "reward": "20,000 ₽",
                "deadline": "1 мар 2025",
                "status": "available",
                "description": "Демонстрация новой коллекции весна-лето для российского рынка",
                "requirements": "Fashion-блогеры, российская женская аудитория",
                "platforms": ["vk", "telegram"],
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        
        await db.campaigns.insert_many(sample_campaigns)
        logger.info("Sample campaigns added to database")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
