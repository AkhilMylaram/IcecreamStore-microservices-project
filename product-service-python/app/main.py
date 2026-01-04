from fastapi import FastAPI
from app.routes import products
from app.database import connect_to_mongo, close_mongo_connection

app = FastAPI(title="Product Service")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

app.include_router(products.router, prefix="/api/products", tags=["products"])

@app.get("/")
async def root():
    return {"message": "Welcome to Product Service"}
