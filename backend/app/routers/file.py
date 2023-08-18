import os
from fastapi import UploadFile, APIRouter, File, Request, HTTPException
from ..utils.extractTextPdf import extract_text_pdf
from ..utils.extractTextImage import extract_text_image
from ..utils.extractTextDocx import extract_text_docx
from supabase import create_client, Client

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

router = APIRouter(
    prefix='/file',
    tags=['file']
)

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


@router.get("/all/{userId}")
async def get_all(userId: str) -> dict:
    response = supabase.table('files').select("id, name, text").eq("userId", userId).execute()
    return response

@router.post("/create/{userId}")
async def create(userId: str, request: Request) -> dict:
    try:
        data = await request.json()
        name = data["name"]
        text = data["text"]

        response = supabase.table('files').insert({"name": name, "text": text, "userId": userId}).execute()
        return response
    
    except KeyError:
        raise HTTPException(status_code=400, detail="Missing data")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred during file creation")

@router.put("/update/{id}")
async def updateFile(id: str, request: Request) -> dict:
    data = await request.json()
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
