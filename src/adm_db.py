import sqlite3 as sql
from .config import db_path

def db(*commands: str):
    with sql.connect(db_path) as connection:
        cursor = connection.cursor()
        for command in commands:
            cursor.execute(command)

def get_product(product_id: int):
    with sql.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM products WHERE product_id = ?", (product_id,))
        result = cursor.fetchone()
        return list(result).pop(0) if result else None

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

def update_product(product_id: int, 
                   *updates: tuple[str, any]):
    #              updates=(update_field_name, new_value)
    # 1st example: updates=("product_price", 49.99)
    # 2nd example:  updates=("product_name", "Cool Shirt #123")
    
    for update in updates:
        new_value = None

        if type(update[1]).__name__ == "str":
            new_value = f"'{update[1]}'"
        else: 
            new_value = update[1]

        db(f"""
           UPDATE products
           SET {update[0]} = {new_value}
           WHERE product_id = {product_id}
           """)
