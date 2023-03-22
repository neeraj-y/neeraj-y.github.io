from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/uploadImage")
async def uploadImage(info: Request):
    req_info = await info.json();
    return {
        "status" : "SUCCESS",
        "data" : req_info
    }
