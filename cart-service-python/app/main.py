from fastapi import FastAPI, Header, HTTPException, Depends
from pydantic import BaseModel
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Optional, List
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@postgres:5432/cart_db")

app = FastAPI(title="Cart Service")

class CartItemIn(BaseModel):
    product_id: str
    name: str
    price: float
    image: Optional[str]
    quantity: int = 1

class CartItemOut(CartItemIn):
    id: int
    user_id: str
    updated_at: datetime


def get_conn():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

@app.on_event("startup")
def startup():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        name TEXT,
        price NUMERIC(10,2),
        image TEXT,
        quantity INTEGER,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
    );
    """)
    conn.commit()
    cur.close()
    conn.close()

@app.get("/health")
def health():
    return {"status": "healthy", "service": "cart-service"}

@app.get("/api/cart", response_model=List[CartItemOut])
def get_cart(x_user_id: Optional[str] = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT id, user_id, product_id, name, price, image, quantity, updated_at FROM cart_items WHERE user_id = %s", (x_user_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    print(f"[cart-service] Read cart for user {x_user_id}: {len(rows)} items")
    return rows

@app.post("/api/cart", response_model=CartItemOut)
def add_item(item: CartItemIn, x_user_id: Optional[str] = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    # Upsert
    cur.execute(
        "INSERT INTO cart_items (user_id, product_id, name, price, image, quantity, updated_at) VALUES (%s,%s,%s,%s,%s,%s,CURRENT_TIMESTAMP) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity, updated_at = CURRENT_TIMESTAMP RETURNING id, user_id, product_id, name, price, image, quantity, updated_at",
        (x_user_id, item.product_id, item.name, item.price, item.image, item.quantity)
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    print(f"[cart-service] Upserted cart item for user {x_user_id}: {row}")
    return row

@app.delete("/api/cart/{product_id}")
def remove_item(product_id: str, x_user_id: Optional[str] = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM cart_items WHERE user_id = %s AND product_id = %s", (x_user_id, product_id))
    conn.commit()
    cur.close()
    conn.close()
    print(f"[cart-service] Removed product {product_id} for user {x_user_id}")
    return {"status": "ok"}

@app.post("/api/cart/clear")
def clear_cart(x_user_id: Optional[str] = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM cart_items WHERE user_id = %s", (x_user_id,))
    conn.commit()
    cur.close()
    conn.close()
    return {"status": "ok"}