from pydantic import BaseModel
from typing import Optional
from typing import List

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


# Define a Pydantic schema for Quiz data
class QuizBase(BaseModel):
    title: str
    description: str | None = None

class QuizCreate(QuizBase):
    pass

class Quiz(QuizBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


# Define a Pydantic schema for Category data
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True


# Define a Pydantic schema for Category data
class FolderBase(BaseModel):
    name: str

class FolderCreate(FolderBase):
    pass

class Folder(FolderBase):
    id: int
    owner_id: int
    quizzes: List[int] = []  # Assuming I'll  store quiz IDs in folders

    class Config:
        orm_mode = True

    

