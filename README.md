# os-lesson-delivery-system

This repository contains a comprehensive educational course delivery system, offering a flexible and intuitive platform for online learning.

---

**Running the Frontend Server**

To start the Expo server, navigate to the project's root directory and use the command `npm run start:app`.

**Running the Backend Server**

To start the FastAPI server, navigate to the project's root directory and use the command `npm run start:backend`.

## Setup Information

### Backend Setup:

Python version 3.10

1. [Install Python](https://www.python.org/downloads/). If you encounter the error "python: command not found," you can contact Maggie for assistance.
2. Open your terminal in the project's **backend** folder. `cd backend`
3. Run the command `python -m venv venv`.
4. Activate the virtual environment with the command `source venv/scripts/activate`. If you encounter any issues, refer to the appropriate command for your operating system (e.g., `bin/activate`).
   Deavtivate the virtual environment with the command `deactivate`.
5. Set the Python path by running `export PYTHONPATH=$PWD`.
   Other way, `shift+ctrl+p` and type `Python: Select Interpreter` and select `./venv/Scripts/python.exe
6. Install the required dependencies with `pip install -r requirements.txt`.
7. To start the server, run `python main.py`. Check that the server is running by navigating to `http://http://localhost:8000/docs` in your browser. See Swagger documentation for API endpoints.

### Frontend:

Ensure that you use a separate terminal from the one used for the backend server.

1. Start by running `npm init` from the root directory. This command will target all workspaces within.