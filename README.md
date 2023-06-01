# os-lesson-delivery-system

This repository contains a comprehensive educational course delivery system, offering a flexible and intuitive platform for online learning.

---

**Running the Frontend Server**

To start the Expo server, navigate to the project's root directory and use the command `npm run start:app`.

**Running the Backend Server**

To start the FastAPI server, navigate to the "backend" folder within the project and use the command `python main.py`.

## Setup Information

### Backend:

1. [Install Python](https://www.python.org/downloads/). If you encounter the error "python: command not found," you can contact Maggie for assistance.
2. Open your terminal in the project's **backend** folder.
3. Run the command `python -m venv venv`.
4. Activate the virtual environment with the command `source venv/scripts/activate`. If you encounter any issues, refer to the appropriate command for your operating system (e.g., `bin/activate`).
5. Set the Python path by running `export PYTHONPATH=$PWD`.
6. Install the required dependencies with `pip install -r requirements.txt`.

### Frontend:

Ensure that you use a separate terminal from the one used for the backend server.

1. Start by running `npm init` from the root directory. This command will target all workspaces within.
2. If the URL on line 14 of App.js does not match your current IPv4 address or if you are unsure, follow the steps below.

---

Due to complications with localhost/CORS for the FastAPI server and React Native server, the current workaround is to use the developer's IP address instead of localhost to establish a connection. We anticipate a better solution in the future.

To replace the IP address in **App.js** with your own, located in the apps/Learning-Buddy folder, follow these steps:

1. Open your terminal and run the command `ipconfig`.
2. Locate the "ipv4 address" in the response.
3. On line 14 of **App.js**, replace the URI up to the colon (e.g., 'http://000.000.00.000') with your IPv4 address.
4. Run the emulator along with the backend and frontend servers to verify if the message from the backend appears correctly in the frontend.

If you encounter connection issues, ensure that the stated IPv4 address matches your current address, as it may have changed.
