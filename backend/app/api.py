from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai
import requests
from . import crud, models, schemas
from .database import SessionLocal, engine
from .routers import auth, questions, sendText

load_dotenv()
models.Base.metadata.create_all(bind=engine)

openai.api_key = os.getenv("API-TOKEN")
app = FastAPI()
app.include_router(questions.router)
app.include_router(auth.router)
app.include_router(sendText.router)

origins = ["http://localhost:3000", "localhost:3000"]


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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



