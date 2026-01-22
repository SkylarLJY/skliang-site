from datetime import datetime

from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    slug: str
    excerpt: str | None = None
    content: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    published: bool = False
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class PostList(BaseModel):
    posts: list[Post]
    total: int
