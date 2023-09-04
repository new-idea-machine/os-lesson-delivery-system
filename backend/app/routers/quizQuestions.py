from fastapi import FastAPI, HTTPException, Depends,APIRouter
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database import Base, SessionLocal
from ..models import Questions

# Pydantic Model for Request/Response
class QuestionBase(BaseModel):
    quiz_id: int

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id: int

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix='/quiz',
    tags=['quiz'])

@router.get('/hello')
def testHello(): 
    return {
      "message": 'hello'
    }

# # CRUD Operations
# @router.post("/questions/", response_model=QuestionRead)
# def create_question(question: QuestionCreate, db: Session = Depends(get_db)):
#     db_question = Questions(**question.dict())
#     db.add(db_question)
#     db.commit()
#     db.refresh(db_question)
#     return db_question

@router.get("/questions/{question_id}", response_model=QuestionRead)
def read_question(question_id: int, db: Session = Depends(get_db)):
    db_question = db.query(Questions).filter(Questions.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question

@router.put("/questions/{question_id}", response_model=QuestionRead)
def update_question(question_id: int, question: QuestionUpdate, db: Session = Depends(get_db)):
    db_question = db.query(Questions).filter(Questions.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")

    for field, value in question.dict().items():
        setattr(db_question, field, value)

    db.commit()
    db.refresh(db_question)
    return db_question

@router.delete("/questions/{question_id}", response_model=str)
def delete_question(question_id: int, db: Session = Depends(get_db)):
    db_question = db.query(Questions).filter(Questions.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")

    db.delete(db_question)
    db.commit()
    return {"message": "Question deleted"}

