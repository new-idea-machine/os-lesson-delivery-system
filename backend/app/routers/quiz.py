from fastapi import APIRouter, HTTPException, Depends
import openai
from pydantic import BaseModel
import json
from fastapi import  APIRouter, Request, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from ..supabase import supabase
from ..schemas import Quiz, QuizBase, QuizFull


router = APIRouter(
    prefix='/quiz',
    tags=['quiz']
)

class Response(BaseModel):
    response: dict

    


@router.get("/")
async def get_quizes(request: Request, db: Session = Depends(get_db)) -> list:
    token = request.headers.get("authorization").replace("Bearer ", "")
    data: dict = supabase.auth.get_user(token)
    
    if data is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    userId = data.user.id
    try:
        response = db.query(models.Quiz).filter(models.Quiz.user_id == userId).all()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")

@router.get("/{quizId}", response_model=Quiz)
async def get_quiz(quizId: int, request: Request, db: Session = Depends(get_db)):
    # token = request.headers.get("authorization").replace("Bearer ", "")
    # data: dict = supabase.auth.get_user(token)
    
    # if data is None:
    #     raise HTTPException(status_code=401, detail="Invalid token")
    
    # userId = data.user.id
    try:
        response =  db.query(models.Quiz).filter(models.Quiz.id == quizId).first()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")
 

@router.get("/fullquiz/{quizId}", response_model=QuizFull)
async def get_quiz(quizId: int, request: Request, db: Session = Depends(get_db)):
    # token = request.headers.get("authorization").replace("Bearer ", "")
    # data: dict = supabase.auth.get_user(token)
    
    # if data is None:
    #     raise HTTPException(status_code=401, detail="Invalid token")
    
    # userId = data.user.id
    try:
        db_quiz =  db.query(models.Quiz).filter(models.Quiz.id == quizId).first()

        db_questions = db.query(models.Questions).filter(models.Questions.quiz_id == quizId).all()
        response = db_quiz
        response.questions=[{"prompt":question.quiz_question,
                             "qtype":question.question_type,
                                "options":{"Correct":question.correct_answer,
                                "Incorrect": question.incorrect_options}
                                }
                                for question in db_questions
                                ]
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")