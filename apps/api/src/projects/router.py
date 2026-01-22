from fastapi import APIRouter

from .schemas import Project, ProjectList

router = APIRouter()


# Placeholder data - will be replaced with database queries
SAMPLE_PROJECTS: list[Project] = []


@router.get("", response_model=ProjectList)
async def list_projects(featured_only: bool = False):
    projects = SAMPLE_PROJECTS
    if featured_only:
        projects = [p for p in projects if p.featured]
    return ProjectList(projects=projects, total=len(projects))


@router.get("/{project_id}", response_model=Project | None)
async def get_project(project_id: int):
    for project in SAMPLE_PROJECTS:
        if project.id == project_id:
            return project
    return None
