from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import chatgpt
from .routers import auth
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai
import requests

load_dotenv()



openai.api_key = os.getenv("API-TOKEN")
app = FastAPI()
app.include_router(chatgpt.router)
app.include_router(auth.router)

origins = ["http://localhost:3000", "localhost:3000"]

# TEST: TODO remove
message = {"message": "Success! Connected to Server"}
header = {"Authorization": f"Bearer {openai.api_key}"}

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

url_getinfo = "https://api.openai.com/v1/models"
url_getcompletion= "https://api.openai.com/v1/chat/completions"

@app.post("/questions", tags=["questions"])
async def get_questions(question: Question) -> Response:
    print(question)
    response = openai.Completion.create(model="text-davinci-003", prompt=question.question, temperature=0, max_tokens=7)
    return {"response": response}