# 24-7 Learning Buddy

This repository contains a comprehensive educational delivery system, offering a flexible and intuitive platform for online learning.

---

Please note that, at present time, Expo can only be run in an emulator on the same machine as the server. Future fixes to be determined.

#### First-time user? Check out the Setup Information Section below to get started.

*Please note that an API token is required to prompt ChatGPT for solutions. You can get your own token after creating an account on the OpenAI website.*


**Running the Frontend Server**

To start the Expo server, navigate to the project's root directory and use the command `npm run start:app`.

**Running the Backend Server**

To start the FastAPI server, navigate to the project's root directory and use the command `npm run start:backend`. Be sure to run your backend and frontend servers in different terminals.

## Setup Information

Note that two .env files are required for the operation of this repo at present time.

1. The first one will be in apps/Learning-Buddy, with the four following fields: IP, SUPABASEURL, SUPABASEKEY_PUBLIC and SUPABASEKEY_ANON. The IP field should be automatically populated with your IPv4 address upon your first time running the frontend with `npm run start:app`.
2. The second one can be found in backend, and has the following fields: API-TOKEN and DATABASE_URL. The API-TOKEN field is required to prompt OpenAI's API and can be created through creating your own account on their website.

### Backend Setup:

#### Server Setup (Python version 3.10)

1. [Install Python](https://www.python.org/downloads/). If you encounter the error "python: command not found," you can contact Maggie for assistance.
2. Open your terminal in the project's **backend** folder.
3. Run the command `python -m venv venv`.
4. Activate the virtual environment with the command `source venv/scripts/activate`. If you encounter any issues, refer to the appropriate command for your operating system (e.g., `bin/activate`).
5. Set the Python path by running `export PYTHONPATH=$PWD`.
6. Install the required dependencies with `pip install -r requirements.txt`.
7. Testing: to confirm server functionality, run `python main.py` from the same folder. Point your browser to `http://localhost:8000/docs` to ensure it is working.
8. See [Swagger documentation](https://swagger.io/tools/swaggerhub/hosted-api-documentation/?utm_source=aw&utm_medium=ppcg&utm_campaign=SEM_SwaggerHub_PR_NA_ENG_EXT_Prospecting&utm_term=swagger%20documentation&utm_content=511173019836&gclid=CjwKCAjwyeujBhA5EiwA5WD7_X2UbJaNbXlf7NY1KCjj-ntQi4hFAhlAZKhr4f80x9AiYo_HQRhN3hoCMVQQAvD_BwE&gclsrc=aw.ds) for API endpoints.

#### PostgreSQL Setup (pre-prod)

1. [Install PostgreSQL](https://www.postgresql.org/download/). For setup instructions, please refer to [this video](https://youtu.be/qw--VYLpxG4?t=863). 
2. If you run into errors including `psql: command not found` or an incorrect name prompt (e.g. defaults to your username instead of postgres), you can update your environment variables to address this. Ask Google or Maggie for assistance.
3. Create a database called "test" and connect to it. (In PSQL, `CREATE DATABASE test ;`)
4. In **backend/.env**, be sure to add your database connection string in the following format: `DATABASE_URL= "postgresql+psycopg2://[user]:[pword]@localhost:5432/test"`
5. You can test your connection by starting up the backend (`npm run start:backend`) and then heading to 
http://127.0.0.1:8000/docs and testing one of the "default" methods.
### Frontend:

Ensure that you use a separate terminal from the one used for the backend server.

1. Start by running `npm install` from the root directory. This command will target all workspaces within.

Note: If you encounter errors and want to deactive the virtual environment, run the command `deactivate`.
