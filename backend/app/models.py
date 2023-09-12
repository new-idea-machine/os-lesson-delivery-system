from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from .database import Base


class User(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"))

    owner = relationship("User", back_populates="items")

class Source(Base):
    __tablename__ = 'files'
    id = Column(Integer, primary_key=True, index=True)
    name =Column(String)
    text = Column(String, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)
    

class Quiz(Base):
    __tablename__ = "quiz"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)
    source_id = Column(Integer, ForeignKey('files.id'),nullable=False)
    quiz_type = Column(Integer)
    create_date = Column(DateTime(timezone=True), server_default=func.now())
    

class Questions(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey('quiz.id'),nullable=False)

class TakenQuiz(Base):
    __tablename__ = "taken_quiz"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey('quiz.id'),nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)
    correct = Column(Integer)
    total_questions = Column(Integer)

class TakenQuizQuestions(Base):
    __tablename__ = "taken_quiz_questions"
    id = Column(Integer, primary_key=True, index=True)
    taken_quiz_id = Column(Integer, ForeignKey('taken_quiz.id'),nullable=False)
    question_id = Column(Integer, ForeignKey('questions.id'),nullable=False)
    user_answer = Column(String)
    correct = Column(Integer)