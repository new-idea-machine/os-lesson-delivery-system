from fastapi import APIRouter
import openai
from pydantic import BaseModel
import json

router = APIRouter(
    prefix='/questions',
    tags=['questions']
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
async def get_questions(question: Request) -> Response:
    numQuestions = question.numQuestions
    text = question.text
    reqQuestion = f'Ask me {numQuestions} questions, they are a mix of multiple choice and true/false question, based only on this information: {text}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {{"topic":"", "questions": [{{"prompt": "", "qtype":, "options": {{"Correct": "", "Incorrect": ["",...]}}}},...]\}} qtype is 1 if multiple choice and qtype is 2 for true and false questions'
    
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=reqQuestion,
        temperature=0,
        max_tokens=300,
    )
    return {"response": response}