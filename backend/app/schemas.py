from pydantic import BaseModel
from uuid import UUID
from datetime import datetime 


class ItemBase(BaseModel):
    title: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True

class QuizBase(BaseModel):
    user_id: UUID
    source_id: int
    quiz_type: int
    create_date: datetime

    class Config:
        orm_mode = True

class Quiz(QuizBase):
    id: int

    class Config:
        orm_mode = True
