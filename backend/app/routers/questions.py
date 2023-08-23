from fastapi import APIRouter
import openai
from pydantic import BaseModel
import json

router = APIRouter(
    prefix='/questions',
    tags=['questions']
)

class Question(BaseModel):
    id: int | None = None
    name: str | None = None
    question: str

class Response(BaseModel):
    response: dict

class Request(BaseModel):
    input: str
    num_questions: int


@router.get('/list')
def list_questions():
    return {
        "message": 'hello'
    }

@router.post("/")
async def get_questions(question: Question) -> Response:

    print('test')
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=question.question,
        temperature=0,
        max_tokens=300,
    )
    return {"response": response}
