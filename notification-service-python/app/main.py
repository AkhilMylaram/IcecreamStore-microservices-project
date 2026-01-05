from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os
import datetime

app = FastAPI(title="Notification Service")

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://mongodb:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.notification_db

class Message(BaseModel):
    recipient: str
    subject: str
    body: str

@app.post("/api/notifications/send")
async def send_notification(message: Message):
    # Mock sending notification (email/sms)
    print(f"Sending notification to {message.recipient}: {message.subject}")
    
    # Save to database
    notification_doc = message.dict()
    notification_doc["sent_at"] = datetime.datetime.utcnow()
    notification_doc["status"] = "SENT"
    await db.notifications.insert_one(notification_doc)
    
    return {"status": "sent", "recipient": message.recipient}

@app.get("/api/notifications/{recipient}")
async def get_notifications(recipient: str):
    cursor = db.notifications.find({"recipient": recipient})
    notifications = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        notifications.append(doc)
    return notifications

@app.get("/")
async def root():
    return {"message": "Welcome to Notification Service"}
