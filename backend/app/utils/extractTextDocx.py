from fastapi import UploadFile, APIRouter, File
from docx import Document

router = APIRouter(
    prefix='/extract',
    tags=['extract']
)

def extract_text_docx(file):
    doc = Document(file)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)