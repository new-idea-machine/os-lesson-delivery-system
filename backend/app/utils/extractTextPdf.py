from PyPDF2 import PdfReader

def extract_text_pdf(pdf): 
    pdfreader = PdfReader(pdf.file)
    x = len(pdfreader.pages)
    texts = ""
    # Loop through all pages
    for i in range(x):
        pageobj = pdfreader.pages[i]
        texts += pageobj.extract_text()
    
    return {"text": texts}