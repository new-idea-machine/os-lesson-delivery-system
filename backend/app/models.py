from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, func, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from .database import Base


class User(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    fullname = Column(String)
    avatar_url = Column(String)
    phonenumber = Column(String)
    

    # Define a relationship with Files model
    files = relationship("Files", back_populates="user", cascade="all, delete-orphan")

    # Define a relationship with Quiz model
    quizzes = relationship("Quiz", back_populates="user", cascade="all, delete-orphan")

    # Define a relationship with TakenQuiz model
    taken_quizzes = relationship("TakenQuiz", back_populates="user", cascade="all, delete-orphan")

    # Define a relationship with folders model
    folder = relationship("Folder", back_populates="user", cascade="all, delete-orphan")

class Files(Base):
    __tablename__ = 'files'
    id = Column(Integer, primary_key=True, index=True)
    name =Column(String)
    text = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)

    # Define a relationship with User model
    user = relationship("User", back_populates="files")
    

class Quiz(Base):
    __tablename__ = "quiz"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)
    source_text = Column(String)
    folder_id = Column(Integer, ForeignKey('folder.id'))
    quiz_type = Column(Integer)
    quiz_name = Column(String)
    created_date = Column(DateTime(timezone=True), server_default=func.now())

    # Define a relationship with User model
    user = relationship("User", back_populates="quizzes")
    

    questions = relationship("Questions", back_populates="quiz", cascade="all, delete-orphan")

class Questions(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey('quiz.id'),nullable=False)
    quiz_question = Column(String)
    correct_answer = Column(String)
    incorrect_options = Column(ARRAY(String))
    question_type = Column(Integer)

    # Define a relationship with Quiz model
    quiz = relationship("Quiz", back_populates="questions")

class TakenQuiz(Base):
    __tablename__ = "taken_quiz"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey('quiz.id'),nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)
    correct = Column(Integer)
    total_questions = Column(Integer)

    # Define a relationship with User model
    user = relationship("User", back_populates="taken_quizzes")
    taken_question = relationship("TakenQuizQuestions", back_populates="taken_quiz", cascade="all, delete-orphan")

class TakenQuizQuestions(Base):
    __tablename__ = "taken_quiz_questions"
    id = Column(Integer, primary_key=True, index=True)
    taken_quiz_id = Column(Integer, ForeignKey('taken_quiz.id'),nullable=False)
    question_id = Column(Integer, ForeignKey('questions.id'),nullable=False)
    user_answer = Column(String)
    correct = Column(Integer)

    taken_quiz = relationship("TakenQuiz", back_populates="taken_question")

class Folder(Base):
    __tablename__ = "folder"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('profiles.id'),nullable=False)
    folder_name = Column(String)

    user = relationship("User", back_populates="folder")