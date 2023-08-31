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
from .routers import questions, file, users, quizeQuestions
from .middleware.authHandler import JWTBearer


# Load environment variables
load_dotenv()

# Create database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

# Set OpenAI API key
openai.api_key = os.getenv("API-TOKEN")
app = FastAPI()
app.include_router(chatgpt.router)
app.include_router(auth.router)
app.include_router(sendText.router)
app.include_router(quizeQuestions.router)


# Initialize FastAPI app
app = FastAPI()

# Include routers

app.include_router(users.router)
app.include_router(file.router, dependencies=[Depends(JWTBearer())])
app.include_router(questions.router)


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



@app.post("/initialize-triggers-functions/")
def initialize_triggers_functions(db: Session = Depends(get_db)):
    create_trigger_script = """
    -- Create a table  for public profiles
    create table if not exists profiles (
    id uuid references auth.users on delete cascade not null primary key,
    updated_at timestamp with time zone,
    email text,
    fullName text,
    avatar_url text,
    phoneNumber text
    );
    -- Set up Row Level Security (RLS)
    -- See https://supabase.com/docs/guides/auth/row-level-security for more details.
    alter table profiles
    enable row level security;

    drop policy "Public profiles are viewable by everyone." on profiles;
    create policy "Public profiles are viewable by everyone." on profiles
    for select using (true);

    drop  policy  "Users can insert their own profile." on profiles;
    create  policy  "Users can insert their own profile." on profiles
    for insert with check (auth.uid() = id);

    drop  policy "Users can update own profile." on profiles;
    create  policy "Users can update own profile." on profiles
    for update using (auth.uid() = id);
    
    -- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
    -- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
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
