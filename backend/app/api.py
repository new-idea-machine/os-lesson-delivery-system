from fastapi import FastAPI, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai
from . import models
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

@app.post("/initialize-triggers-functions/")
def initialize_triggers_functions(db: Session = Depends(get_db)):
    create_trigger_script = """
    create or replace function public.handle_new_user()
    returns trigger as $$
    begin
    insert into public.profiles (id, fullName, avatar_url, email)
    values (new.id, new.raw_user_meta_data->>'fullName', new.raw_user_meta_data->>'avatar_url', new.email);
    return new;
    end;
    $$ language plpgsql security definer;

    create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
    """
    # print(create_trigger_script)
    try:

        with engine.connect() as connection:
            result = connection.execute(text(create_trigger_script))
            print(f"result:{result}")
            connection.commit()
           
    except Exception as e:
        return {"error": f"Error initializing triggers/functions: {str(e)}"}


    return {"message": "Triggers and functions initialized"}