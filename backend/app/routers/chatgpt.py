from fastapi import APIRouter
import openai
from pydantic import BaseModel
import json

router = APIRouter(
    prefix='/chat',
    tags=['chat']
)


class Request(BaseModel):
    input: str
    num_questions: int


@router.get('/list')
def list_questions():
    return {
        "message": 'hello'
    }


@router.post('/shortanswer')
def short_answer_questions(body: Request):
    completion = openai.Completion.create(
        model="text-davinci-003",
        temperature=0.8,
        max_tokens=200,
        prompt="Use only the following content to create a short answer quiz with {}  questions and return in a JSON format following the this outline {{ \"questions\":[]}}: {}".format(
            body.num_questions, body.input)
    )
    return {
        "results": completion.choices[0].text
    }


@router.post('/multiplechoice')
def multiple_choice_questions(body: Request):
    completion = openai.Completion.create(
        model="text-davinci-003",
        temperature=0.8,
        max_tokens=200,
        prompt="Use only the following content to create a multiple choice quiz with {}  questions and return in a JSON format following the this outline {{ \"questions\":[{{\"question\":\"\", \"options\":\"\", \"answers\":\"\"}}],}}: {}".format(
            body.num_questions, body.input)
    )
    return {
        "results": completion.choices[0].text
    }


@router.post('/fakecall')
def multiple_choice_questions(body: Request):
    fake_response = "\n\nQuestion 1: What is the capital of France? \nOptions: A)London, B)Rome, C)Paris, D)Berlin \nAnswer: C)Paris\n\n{\n  \"questions\": [\n    {\n      \"question\": \"What is the capital of France?\",\n      \"options\": \"A)London, B)Rome, C)Paris, D)Berlin\",\n      \"answer\": \"C)Paris\"\n    }\n  ]\n}"
    fake_response = fake_response.strip()
    fake_response_dict = json.load(fake_response)
    return {
        "results": fake_response
    }
