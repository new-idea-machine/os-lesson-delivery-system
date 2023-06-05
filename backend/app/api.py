from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests

load_dotenv()

api_token = os.getenv("API-TOKEN")
app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]

# TEST: TODO remove
message = {"message": "Success! Connected to Server"}
header = {"Authorization": f"Bearer {api_token}"}

class Question(BaseModel):
    id: int | None = None
    name: str | None = None
    question: str

class Response(BaseModel):
    response: dict

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DEV: TODO remove following two requests
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello World"}

@app.get("/message", tags=["message"])
async def get_message() -> dict:
    return {"data": message}

url = "https://api.openai.com/v1/models"

@app.post("/questions", tags=["questions"])
async def get_questions(question: Question) -> Response:
    # print(question.question)
    x = requests.get(url, headers=header)
    return {"response": x.json()}