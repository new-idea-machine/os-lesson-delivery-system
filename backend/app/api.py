from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]
# TEST: TODO remove 
message = {"message": "sup brah"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# DEV: TODO remove following two requests
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello World"}

@app.get("/message", tags=["message"])
async def get_message() -> dict:
    return { "data": message }

