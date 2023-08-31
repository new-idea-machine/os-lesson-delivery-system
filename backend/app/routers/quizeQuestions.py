from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix='/quize',
    tags=['quize'])

class Request(BaseModel):
    input: str
    num_questions: int

@router.get('/hello')
def testHello(): 
    return {
      "message": 'hello'
    }