import os
from fastapi import UploadFile, APIRouter, File, Request, HTTPException
from pydantic import BaseModel
from ..utils.extractTextPdf import extract_text_pdf
from ..utils.extractTextImage import extract_text_image
from ..utils.extractTextDocx import extract_text_docx
from supabase import create_client, Client
import json

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

router = APIRouter(
    prefix='/file',
    tags=['file']
)


class CreateFileBody(BaseModel):
    text: str
    name: str

# File Routes 
@router.post('/extract')
async def send_text(file: UploadFile = File(...)):
        print(file.content_type)
        if not file:
            return {"message": "No upload file sent"}
        else:
            if file.content_type == "application/pdf":
                text = extract_text_pdf(file)
                return text
            elif file.content_type in {"image/png", "image/jpg", "image/jpeg"}:

                # Save the uploaded image temporarily
                with open("temp_image.jpg", "wb") as f:
                    f.write(file.file.read())

                # Read text from the image using pytesseract
                text = await extract_text_image("temp_image.jpg")

                # Remove the temporary image file (optional)
                import os
                os.remove("temp_image.jpg")

                return text
            elif file.filename.endswith(".docx"):
                text = extract_text_docx(file.file)
                return {"text": text}


@router.get("/all")
async def get_all(request: Request) -> list:
    token = request.headers.get("authorization").replace("Bearer ", "")
    data: dict = supabase.auth.get_user(token)
    
    if data is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    userId = data.user.id
    try:
        response = supabase.table('files').select("id, name, text, user_id").eq("user_id", userId).execute()
        print(response.data)
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")

@router.get("/{fileId}")
async def get_all(request: Request, fileId:int) -> dict:
    token = request.headers.get("authorization").replace("Bearer ", "")
    data: dict = supabase.auth.get_user(token)
    
    if data is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    userId = data.user.id
    try:
        response = supabase.table('files').select("id, name, text, user_id").eq("id", fileId).single().execute()
        
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred trying to access db: {e.message}")

@router.post("/create")
async def create(request_body: CreateFileBody, request: Request) -> dict:
    token = request.headers.get("authorization").replace("Bearer ", "")
    authData: dict = supabase.auth.get_user(token)
    
    if authData is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    userId = authData.user.id

    try:
    
        name = request_body.name
        text = request_body.text

        response = supabase.table('files').insert({"name": name, "text": text, "user_id": userId}).execute()
        return response
    
    except KeyError:
        raise HTTPException(status_code=400, detail="Missing data")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="An error occurred during file creation")



@router.put("/update/{id}")
async def updateFile(id: int, updateBody: CreateFileBody, request: Request) -> dict:
    data = await request.json()
    print(data)
    name = data["name"]
    text = data["text"]
    try:
        response = supabase.table('files').update({ "name": name, "text": text }).eq('id', id).execute()
        return response

    except KeyError:
        raise HTTPException(status_code=400, detail="Missing data")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred during file creation")

@router.delete("/delete/{id}")
async def deleteFile(id: str) -> dict:
    try:
        response = supabase.table('files').delete().eq('id', id).execute()

        if response:
            return {"message": "File Deleted"}
        else:
            raise HTTPException(status_code=500, detail="File deletion failed")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="File deletion failed")
