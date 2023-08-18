from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai
from . import crud, models, schemas
from .database import SessionLocal, engine
from .routers import chatgpt, auth, file


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
app.include_router(file.router)

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

# User routes
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

# Read items route
@app.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items