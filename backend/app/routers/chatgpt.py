from fastapi import APIRouter
import openai
from pydantic import BaseModel

router = APIRouter(
    prefix='/chat',
    tags=['chat']
)

class Request(BaseModel):
    input: str
    num_questions: int

@router.get('/list')
def list_questions():
    return{
        "message": 'hello'
    }

@router.post('/shortanswer')
def short_answer_questions(body: Request):
    completion = openai.Completion.create(
    model = "text-davinci-003",
    temperature = 0.8,
    max_tokens = 200,
    prompt = "Use only the following content to create a short answer quiz with {}  questions and return in a JSON format following the this outline {{ \"questions\":[]}}: {}".format(body.num_questions, body.input)
    )
    return{
        "results": completion.choices[0].text
    }

@router.post('/multiplechoice')
def multiple_choice_questions(body: Request):
    completion = openai.Completion.create(
    model = "text-davinci-003",
    temperature = 0.8,
    max_tokens = 200,
    prompt = "Use only the following content to create a multiple choice quiz with {}  questions and return in a JSON format following the this outline {{ \"questions\":[{{\"question\":\"\", \"options\":\"\", \"answers\":\"\"}}],}}: {}".format(body.num_questions,body.input)
    )
    return{
        "results": completion.choices[0].text
    }
