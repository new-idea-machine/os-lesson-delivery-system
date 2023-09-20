from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,  DateTime, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):   
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

class Quiz(Base): #any other data to be added in here ?
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    taken_at = Column(DateTime)
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Store user's answers and their correctness for each question
    user_answers = Column(JSON)

    owner = relationship("User", back_populates="quizzes")

class Categories(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)

    quizzes = relationship("Quiz", back_populates="category")

class Folders(Base):
    __tablename__ = "folders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quizzes = Column(JSON)  # Store a list of quiz IDs in the folder

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="folders")