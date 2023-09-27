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


# Define a Pydantic schema for folder data
class FolderBase(BaseModel):
    name: str

class FolderCreate(FolderBase):
    pass

class Folder(FolderBase):
    id: int
    owner_id: int
    quizzes: List[int] = []  # Assuming I'll store quiz IDs in folders

    class Config:
        orm_mode = True

# Define a Pydantic schema for questionBase data

class QuestionsBase(BaseModel):
    quiz_id: int
    quiz_question: str
    correct_answer: str
    incorrect_options: List[str]

class QuestionsCreate(QuestionsBase):
    pass

class Questions(QuestionsBase):
    id: int

    class Config:
        orm_mode = True

# Define a Pydantic schema for takenQuizBase data

class TakenQuizBase(BaseModel):
    quiz_id: int
    user_id: str  # Assuming UUID is represented as a string
    correct: int
    total_questions: int

class TakenQuizCreate(TakenQuizBase):
    pass

class TakenQuiz(TakenQuizBase):
    id: int

    class Config:
        orm_mode = True

# Define a Pydantic schema for takenQuizQuestions data

class TakenQuizQuestionsBase(BaseModel):
    taken_quiz_id: int
    question_id: int
    user_answer: str
    correct: int

class TakenQuizQuestionsCreate(TakenQuizQuestionsBase):
    pass

class TakenQuizQuestions(TakenQuizQuestionsBase):
    id: int

    class Config:
        orm_mode = True
