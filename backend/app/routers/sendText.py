from fastapi import UploadFile, APIRouter, File
from ..utils.extractTextPdf import extract_text_pdf
from ..utils.extractTextImage import extract_text_image
from ..utils.extractTextDocx import extract_text_docx

router = APIRouter(
    prefix='/extract',
    tags=['extract']
)

@router.post('/file')
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

