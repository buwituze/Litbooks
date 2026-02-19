from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlalchemy import select
from app.database import engine, Base, async_session_maker
from app.routers import auth, books
from app.models import User
from app.auth import get_password_hash
from app.config import settings


async def create_admin_user():
    if not settings.ADMIN_EMAIL or not settings.ADMIN_PASSWORD:
        return
    
    async with async_session_maker() as session:
        result = await session.execute(
            select(User).filter(User.email == settings.ADMIN_EMAIL)
        )
        admin = result.scalar_one_or_none()
        
        if not admin:
            admin = User(
                email=settings.ADMIN_EMAIL,
                full_name=settings.ADMIN_FULL_NAME,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                role="admin"
            )
            session.add(admin)
            await session.commit()
            print(f"Admin user created: {settings.ADMIN_EMAIL}")
        elif admin.role != "admin":
            admin.role = "admin"
            await session.commit()
            print(f"User {settings.ADMIN_EMAIL} promoted to admin")


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await create_admin_user()
    yield
    await engine.dispose()


app = FastAPI(
    title="Litbooks API",
    description="A mini-Goodreads API for managing books",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(books.router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Litbooks API",
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
