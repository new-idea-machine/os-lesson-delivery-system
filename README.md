# os-lesson-delivery-system
A comprehensive educational course delivery system that will provide a flexible and intuitive platform for online learning.


## For Devs
To set up backend:

1. Install Python
2. Open terminal in project's backend folder
3. run command "python -m venv venv"
4. run command "source venv/scripts/activate" -> if you have issues, see if you can source appropriate command for your OS
5. run "export PYTHONPATH=$PWD"
6. "pip install -r requirements.txt"

To run the backend, run command "python main.py".

### To integrate with frontend
Be sure to use a separate terminal to run your frontend server.

Use command "npm run start:app" from root folder to start expo server.

In apps/Learning.... in App.js, replace IP address with your own using following steps:

1. in terminal, run command "ipconfig"
2. in response, find address for "ipv4 address"
3. replace URI up to the colon (e.g. 'http://000.000.00.000') with your ipv4 address.
4. Run emulator along backend/ frontend servers to test if the message from backend is showing up as expected in frontend.

If you are having connection issues, be sure that the stated ipv4 address matches your current ipv4 address as it may have changed!