from fastapi import APIRouter, Depends
import openai
from pydantic import BaseModel
import json
from sqlalchemy.orm import Session
from ..schemas import QuizCreate
from .. import models
from ..database import get_db

router = APIRouter(
    prefix='/genquestions',
    tags=['genquestions']
)

class Response(BaseModel):
    response: dict

class Request(BaseModel):
    text: str
    numQuestions: int


@router.post("/mc")
async def get_questions(question: Request) -> Response:
    numQuestions = question.numQuestions
    text = question.text
    reqQuestion = f'Ask me {numQuestions} questions, multiple choice with four different potential answers, based only on this information: {text}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {{"topic":"", "questions": [{{"prompt": "", "qtype":1, "options": {{"Correct": "", "Incorrect": ["", "", ""]}}}},...]\}}'
    
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=reqQuestion,
        temperature=0,
        max_tokens=300,
    )
    return {"response": response}

@router.post("/tf")
async def get_questions(question: Request) -> Response:
    numQuestions = question.numQuestions
    text = question.text
    reqQuestion = f'Ask me {numQuestions} questions, true and false with two different potential answers, based only on this information: {text}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {{"topic":"", "questions": [{{"prompt": "", "qtype":2, "options": {{"Correct": "", "Incorrect": [""]}}}},...]\}}'
    
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=reqQuestion,
        temperature=0,
        max_tokens=300,
    )
    return {"response": response}


@router.post("/mixed")
async def get_questions(question: Request, db: Session = Depends(get_db)) -> Response:
    numQuestions = question.numQuestions
    text = question.text
    reqQuestion = f'Ask me {numQuestions} questions, they are a mix of multiple choice and true/false question, based only on this information: {text}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {{"quiz_name":"", "questions": [{{"prompt": "", "qtype":, "options": {{"Correct": "", "Incorrect": ["",...]}}}},...]\}} qtype is 1 if multiple choice and qtype is 2 for true and false questions'
    
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=reqQuestion,
        temperature=0,
        max_tokens=300,
    )
    quiz = json.loads(response.choices[0].text)
    create_quiz({**quiz, "user_id":"35c509ed-f3fa-4aa5-831c-d607bf9347c1", "quiz_type":1, "source_text":text}, db)
    return {"response": response}


def create_quiz(quiz: QuizCreate,db: Session):
    request_data = QuizCreate(**quiz)
    db_quiz = models.Quiz(**request_data.dict(exclude={"questions"}))
  
    
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)

    for question in request_data.questions:
        db_question = models.Questions(**{"quiz_question":question.prompt,"correct_answer":question.options.Correct, "incorrect_options":question.options.Incorrect, "quiz_id":db_quiz.id})
        db.add(db_question)

    db.commit()
    db.refresh(db_quiz)
    return None
