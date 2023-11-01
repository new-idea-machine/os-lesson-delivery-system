# 24-7 Learning Buddy

This repository contains a comprehensive educational delivery system, offering a flexible and intuitive platform for online learning.

---

Please note that, at present time, Expo can only be run in an emulator on the same machine as the server. Future fixes to be determined.

#### First-time user? Check out the Setup Information Section below to get started.

_Please note that an API token is required to prompt ChatGPT for solutions. You can get your own token after creating an account on the OpenAI website._

**Running the Frontend Server**

To start the Expo server, navigate to the project's root directory and use the command `npm run start:app`.

**Running the Backend Server**

To start the FastAPI server, navigate to the project's root directory and use the command `npm run start:backend`. Be sure to run your backend and frontend servers in different terminals.

## Setup Information

Note that two .env files are required for the operation of this repo at present time.

1. The first one will be in apps/Learning-Buddy, with the four following fields: IP, SUPABASEURL, SUPABASEKEY_PUBLIC and SUPABASEKEY_SECRET. The IP field should be automatically populated with your IPv4 address upon your first time running the frontend with `npm run start:app` (or `npx expo start --clear`).
2. The second one can be found in backend, and has the following fields: API-TOKEN and DATABASE_URL. The API-TOKEN field is required to prompt OpenAI's API and can be created through creating your own account on their website.

### Backend Setup:

#### Server Setup (Python version 3.10)

1. [Install Python](https://www.python.org/downloads/). If you encounter the error "python: command not found," you can contact Maggie for assistance.
2. Open your terminal in the project's **backend** folder.
3. Run the command `python -m venv venv`.
4. Activate the virtual environment with the command `source venv/scripts/activate`. If you encounter any issues, refer to the appropriate command for your operating system (e.g., `source venv/bin/activate`).
5. Set the Python path by running `export PYTHONPATH=$PWD`.
6. Install the required dependencies with `pip install -r requirements.txt`.
7. Testing: to confirm server functionality, run `python main.py` from the same folder. Point your browser to `http://localhost:8000/docs` to ensure it is working.
8. See [Swagger documentation](https://swagger.io/tools/swaggerhub/hosted-api-documentation/?utm_source=aw&utm_medium=ppcg&utm_campaign=SEM_SwaggerHub_PR_NA_ENG_EXT_Prospecting&utm_term=swagger%20documentation&utm_content=511173019836&gclid=CjwKCAjwyeujBhA5EiwA5WD7_X2UbJaNbXlf7NY1KCjj-ntQi4hFAhlAZKhr4f80x9AiYo_HQRhN3hoCMVQQAvD_BwE&gclsrc=aw.ds) for API endpoints.

#### PostgreSQL Setup (supabase)

1. Obtain the URI connection string for `DATABASE_URL` in the **backend/.env** file. If you are using your own supabase account/project you can find the connection string under "Project Setting -> Database -> Connections string" and pick URI as the type, copy to .env and replace [YOUR-PASSWORD] with your password.
2. If you you are connecting to your database for the first time you will need to start your backend server and run the endpoint '/initialize-triggers-functions/'. This will initalize user profile table and create triggers to add new users to profile table as they sign up in your application.

### Frontend:

Ensure that you use a separate terminal from the one used for the backend server.

1. Start by running `npm install` from the root directory. This command will target all workspaces within.

Note: If you encounter errors and want to deactivate the virtual environment, run the command `deactivate`.

### Text extractor

To extract text from the image we are using tesseract.

# For windows

1. download binary from https://github.com/UB-Mannheim/tesseract/wiki.
2. If you don't have tesseract executable in your PATH, include the following:
   `pytesseract.pytesseract.tesseract_cmd = r'<full_path_to_your_tesseract_executable>'`

# Example tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract'

# For macOS brew install tesseract

# File Routes to handle extract and file crud

- file/extract
- file/all/{userId}
- file/create/{userId} // pass data as {name: "File Name", text: "File Text"}
- file/update/{id} // pass data as {name: "New File Name", text: "New File Text"}
- file/delete/{id}
