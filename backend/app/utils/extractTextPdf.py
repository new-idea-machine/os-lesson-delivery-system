from PyPDF2 import PdfReader

def extract_text_pdf(pdf): 
    pdfreader = PdfReader(pdf.file)
    x = len(pdfreader.pages)
    extracted_text  = ""

    # Loop through all pages
    for i in range(x):
        pageobj = pdfreader.pages[i]
        extracted_text  += pageobj.extract_text()
    
    return {"text": extracted_text }