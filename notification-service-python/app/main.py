from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Notification Service")

class Message(BaseModel):
    recipient: str
    subject: str
    body: str

@app.post("/api/notifications/send")
async def send_notification(message: Message):
    # Mock sending notification (email/sms)
    print(f"Sending notification to {message.recipient}: {message.subject}")
    return {"status": "sent", "recipient": message.recipient}

@app.get("/")
async def root():
    return {"message": "Welcome to Notification Service"}
