from fastapi import APIRouter, HTTPException, Depends
import openai
from pydantic import BaseModel
import json
from fastapi import  APIRouter, Request, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from ..supabase import supabase
from ..schemas import Quiz, QuizBase, QuizFull, Question


router = APIRouter(
    prefix='/quiz',
    tags=['quiz']
)

class Response(BaseModel):
    response: dict

    

# get all of a user quizes
@router.get("/",response_model=list[Quiz])
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
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")

#get single quiz by id
@router.get("/{quizId}", response_model=Quiz)
async def get_quiz(quizId: int, db: Session = Depends(get_db)):
    try:
        response =  db.query(models.Quiz).filter(models.Quiz.id == quizId).first()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")

#delete single quiz by id
@router.delete("/{quizId}", response_model=dict)
async def get_quiz(quizId: int, db: Session = Depends(get_db)):

    db_quiz =  db.query(models.Quiz).filter(models.Quiz.id == quizId).first()

    if db_quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    try:
        db.delete(db_quiz)
        db.commit()
        return {"message": f"Quiz with ID {quizId} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")

#get quiz by id with questions
@router.get("/fullquiz/{quizId}", response_model=QuizFull)
async def get_quiz(quizId: int, db: Session = Depends(get_db)):
    
    db_quiz =  db.query(models.Quiz).filter(models.Quiz.id == quizId).first()

    if db_quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")

    db_questions = db.query(models.Questions).filter(models.Questions.quiz_id == quizId).all()
    
    response= {
        "id": db_quiz.id,
        "user_id": db_quiz.user_id,
        "source_text": db_quiz.source_text,
        "folder_id": db_quiz.folder_id,
        "quiz_type": db_quiz.quiz_type,
        "quiz_name":db_quiz.quiz_type,
        "created_date": db_quiz.created_date,
        "questions":[
            {
                "prompt":question.quiz_question,
                "qtype":question.question_type,
                "options":{
                    "Correct":question.correct_answer,
                    "Incorrect": question.incorrect_options
                    }
            }
            for question in db_questions
        ]
    }

    try:
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")

#get only the questions from a quiz
@router.get("/allquestioninquiz/{quizId}", response_model=list[Question])
async def get_quiz(quizId: int, db: Session = Depends(get_db)):

    try:
        db_results =  db.query(models.Questions).filter(models.Questions.quiz_id == quizId).all()

        response =[{"prompt":question.quiz_question,
                    "id":question.id,
                             "qtype":question.question_type,
                                "options":{"Correct":question.correct_answer,
                                "Incorrect": question.incorrect_options}
                                }
                                for question in db_results
                                ]
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")
    
#gets a single question by id
@router.get("/questionbyid/{questionId}", response_model=Question)
async def get_quiz(questionId: int, db: Session = Depends(get_db)):

    try:
        db_results =  db.query(models.Questions).filter(models.Questions.id == questionId).first()

    except Exception as e:
        if hasattr(e, 'message'):
            raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")
        else:
            raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")

    if db_results is None:
            raise HTTPException(status_code=404, detail="Item not found")
        

    response ={"prompt":db_results.quiz_question,
                    "id":db_results.id,
                             "qtype":db_results.question_type,
                                "options":{"Correct":db_results.correct_answer,
                                "Incorrect": db_results.incorrect_options}
                                }
                                
    return response

#deletes a single question by id
@router.delete("/questionbyid/{questionId}", response_model=dict)
async def get_quiz(questionId: int, db: Session = Depends(get_db)):

    db_question =  db.query(models.Questions).filter(models.Questions.id == questionId).first()

    if db_question is None:
        raise HTTPException(status_code=404, detail="Quiz not found")

    try:
        db.delete(db_question)
        db.commit()
        return {"message": f"Question with ID {questionId} deleted successfully"}
    except Exception as e:
        if hasattr(e, 'message'):
            raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")
        else:
            raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e}")
