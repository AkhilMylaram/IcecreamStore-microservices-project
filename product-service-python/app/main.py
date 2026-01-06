from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import products
from app.database import connect_to_mongo, close_mongo_connection, get_database

app = FastAPI(title="Product Service")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def seed_products():
    database = get_database()
    collection = database.products
    count = await collection.count_documents({})
    if count == 0:
        mock_products = [
            {
                "name": "Strawberry Bliss",
                "category": "Fruit",
                "price": 4.99,
                "rating": 4.8,
                "image_url": "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1000&auto=format&fit=crop",
                "description": "Creamy strawberry goodness with real chunks.",
                "image_prompt": "Realistic scoop of strawberry ice cream with chunks in a bowl",
                "inventory_count": 100
            },
            {
                "name": "Chocolate Heaven",
                "category": "Chocolate",
                "price": 5.50,
                "rating": 4.9,
                "image_url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
                "description": "Triple layer chocolate indulgence.",
                "image_prompt": "Gourmet triple chocolate ice cream scoop with syrup",
                "inventory_count": 50
            },
            {
                "name": "Mango Tango",
                "category": "Fruit",
                "price": 4.75,
                "rating": 4.7,
                "image_url": "https://images.unsplash.com/photo-1528577910701-b2da2f449884?q=80&w=1000&auto=format&fit=crop",
                "description": "Exotic Alfonso mangoes for a tropical kick.",
                "image_prompt": "Vibrant mango ice cream scoop on a sunny background",
                "inventory_count": 80
            },
            {
                "name": "Vanilla Velvet",
                "category": "Classic",
                "price": 4.25,
                "rating": 4.6,
                "image_url": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1000&auto=format&fit=crop",
                "description": "Classic Madagascar vanilla beans.",
                "image_prompt": "Smooth vanilla ice cream with black bean specks",
                "inventory_count": 200
            }
        ]
        await collection.insert_many(mock_products)
        print("Seeded database with mock products")

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    await seed_products()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

app.include_router(products.router, prefix="/api/products", tags=["products"])

@app.get("/")
async def root():
    return {"message": "Welcome to Product Service"}
