from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .contact.router import router as contact_router
from .blog.router import router as blog_router
from .projects.router import router as projects_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="Skylar Liang Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_router, prefix="/api/v1/contact", tags=["contact"])
app.include_router(blog_router, prefix="/api/v1/posts", tags=["blog"])
app.include_router(projects_router, prefix="/api/v1/projects", tags=["projects"])


@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy"}
