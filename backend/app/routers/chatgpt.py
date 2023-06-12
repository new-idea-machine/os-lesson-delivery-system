from fastapi import APIRouter
import openai

router = APIRouter(
    prefix='/chat',
    tags=['chat']
)


@router.get('/list')
def list_questions():
    return{
        "message": 'hello'
    }

@router.get('/shortanswer')
def list_questions(testinput: str, num_questions: int):
    completion = openai.Completion.create(
    model = "text-davinci-003",
    temperature = 0.8,
    max_tokens = 200,
    prompt = "Use the following content to create a short answer quiz with " + str(num_questions) + " questions: " +  testinput
    )
    return{
        "message": "Use the following content to create a short answer quiz with " + str(num_questions) + " questions and return in JSON format: " +  testinput,
        "questions": completion
    }
