from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime 




class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: UUID
    avatar_url: Optional[str]
    fullname: Optional[str]
    phonenumber: Optional[str]
    # is_active: bool

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

class Question(QuestionsBase):
    id: int
    
