from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models import Product
from app.database import get_database
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[Product])
async def list_products(db = Depends(get_database)):
    products = await db["products"].find().to_list(100)
    return products

@router.post("/", response_model=Product)
async def create_product(product: Product, db = Depends(get_database)):
    product_dict = product.model_dump(by_alias=True)
    if "_id" in product_dict and product_dict["_id"] is None:
        del product_dict["_id"]
    
    result = await db["products"].insert_one(product_dict)
    product_dict["_id"] = result.inserted_id
    return product_dict


@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str, db = Depends(get_database)):
    product = await db["products"].find_one({"_id": ObjectId(product_id)})
    if product:
        return product
    raise HTTPException(status_code=404, detail="Product not found")
