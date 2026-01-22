from datetime import datetime

from pydantic import BaseModel


class ProjectBase(BaseModel):
    title: str
    description: str | None = None
    technologies: list[str] = []
    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    featured: bool = False


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    order: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    projects: list[Project]
    total: int
