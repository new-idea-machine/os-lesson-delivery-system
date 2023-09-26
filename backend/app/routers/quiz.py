from fastapi import APIRouter, HTTPException, Depends
import openai
from pydantic import BaseModel
import json
from fastapi import  APIRouter, Request, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models

router = APIRouter(
    prefix='/quiz',
    tags=['quiz']
)

class Response(BaseModel):
    response: dict

    


@router.get("/")
async def get_quizes(request: Request, db: Session = Depends(get_db)) -> list:
    token = request.headers.get("authorization").replace("Bearer ", "")
    data: dict = supabase.auth.get_user(token)
    
    if data is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    userId = data.user.id
    try:
        response = db.query(models.Quiz).all()
        print(response)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")


