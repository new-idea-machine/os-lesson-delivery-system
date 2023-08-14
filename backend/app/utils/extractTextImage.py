import os
import pytesseract
import cv2

async def extract_text_image(image_path):
    dir = os.getcwd()
    path = os.path.join(dir, image_path)
    img_cv = cv2.imread(path)

    # # By default OpenCV stores images in BGR format and since pytesseract assumes RGB format,
    # # we need to convert from BGR to RGB format/mode:
    img_rgb = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)
    extracted_text = pytesseract.image_to_string(img_rgb)

    return {"text": extracted_text}