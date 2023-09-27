from pydantic import BaseModel
from typing import Optional
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
    source_text: Optional[str]
    quiz_type: int
    folder_id: Optional[int]
    quiz_name: Optional[str]

    class Config:
        orm_mode = True

class Quiz(QuizBase):
    id: int
    created_date: datetime

    class Config:
        orm_mode = True

class QuestionOptions(BaseModel):
    Correct: str
    Incorrect: list[str]

    
class QuestionsBase(BaseModel):
    prompt: str
    options: QuestionOptions
    qtype: int

    class Config:
        orm_mode = True

class QuizCreate(QuizBase):
    questions: list[QuestionsBase]

    class Config:
        orm_mode = True

class QuizFull(QuizCreate):
    id: int
    created_date: datetime

    class Config:
        orm_mode = True