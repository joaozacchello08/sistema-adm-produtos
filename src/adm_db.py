import sqlite3 as sql
from ..main import db_path

def db(*commands):
    with sql.connect(db_path) as connection:
        cursor = connection.cursor()
        for command in commands:
            cursor.execute(command)

def start_db():
    db("""
        CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT NOT NULL CHECK (LENGTH(product_name) <= 100),
            product_price REAL NOT NULL CHECK (product_price >= 0),
            product_stock INTEGER NOT NULL CHECK (product_stock >= 0),
            product_barcode TEXT NOT NULL UNIQUE CHECK (LENGTH(product_barcode) BETWEEN 8 AND 14),
            product_image_path TEXT NOT NULL CHECK (LENGTH(product_image_path) <= 255)
        )
       """)

def insert_new_product(product_name: str,
                       product_price: int,
                       product_stock: int,
                       product_barcode: str,
                       product_image_path: str):
    db(f"""
        INSERT INTO products (product_name, product_price, product_stock, product_barcode, product_image_path)
        VALUES ('{product_name}', {product_price}, {product_stock}, '{product_barcode}', '{product_image_path}')
    """)

def remove_product(product_id: int):
    db(f"DELETE FROM products WHERE product_id = {product_id}")

def single_update_product(product_id, 
                          update: tuple[str, any]):
               #          update=(update_field_name, new_value)
               # example: update=("product_price", 49.99)
    new_value = 
    
    db(f"""
        UPDATE products 
        SET {update[0]} = 
        WHERE product_id = '{product_id}'
    """)
