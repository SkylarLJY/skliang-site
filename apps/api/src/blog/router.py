from fastapi import APIRouter

from .schemas import Post, PostList

router = APIRouter()


# Placeholder data - will be replaced with database queries
SAMPLE_POSTS: list[Post] = []


@router.get("", response_model=PostList)
async def list_posts(skip: int = 0, limit: int = 10):
    posts = SAMPLE_POSTS[skip : skip + limit]
    return PostList(posts=posts, total=len(SAMPLE_POSTS))


@router.get("/{slug}", response_model=Post | None)
async def get_post(slug: str):
    for post in SAMPLE_POSTS:
        if post.slug == slug:
            return post
    return None
