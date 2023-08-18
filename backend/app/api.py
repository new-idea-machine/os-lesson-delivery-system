from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai
from . import crud, models, schemas
from .database import SessionLocal, engine
from .routers import chatgpt, auth, file, users
from .middleware.authHandler import JWTBearer


# Load environment variables
load_dotenv()

# Create database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

# Set OpenAI API key
openai.api_key = os.getenv("API-TOKEN")

# Initialize FastAPI app
app = FastAPI()

# Include routers
app.include_router(chatgpt.router)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(file.router, dependencies=[Depends(JWTBearer())])

# Configure CORS middleware
origins = ["http://localhost:3000", "localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test message
message = {"message": "Success! Connected to Server"}
header = {"Authorization": f"Bearer {openai.api_key}"}

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class Question(BaseModel):
    id: int | None = None
    name: str | None = None
    question: str

class Response(BaseModel):
    response: dict

# Message route
@app.get("/message", tags=["message"])
async def get_message() -> dict:
    return {"data": message}

# OpenAI URLs
url_getinfo = "https://api.openai.com/v1/models"
url_getcompletion = "https://api.openai.com/v1/chat/completions"

# Get questions using OpenAI
@app.post("/questions", tags=["questions"])
async def get_questions(question: Question) -> Response:
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=question.question,
        temperature=0,
        max_tokens=300,
    )
    return {"response": response}

