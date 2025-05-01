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
        return list(result) if result else None

def get_products():
    with sql.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM products")
        results = cursor.fetchall()
        return [list(row) for row in results] if results else []

def start_db():
    db("""
        CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT NOT NULL CHECK (LENGTH(product_name) <= 100),
            product_price REAL NOT NULL CHECK (product_price >= 0),
            product_stock INTEGER NOT NULL CHECK (product_stock >= 0),
            product_barcode TEXT NOT NULL UNIQUE CHECK (LENGTH(product_barcode) BETWEEN 8 AND 14),
            product_image_path TEXT NOT NULL
        )
       """,
       """
        CREATE TABLE IF NOT EXISTS vendas (
            venda_id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            total_price REAL NOT NULL CHECK (total_price >= 0)
        )
       """,
       """
        CREATE TABLE IF NOT EXISTS venda_itens (
            venda_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            venda_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            product_amount_sell INTEGER NOT NULL CHECK (product_amount_sell > 0),
            price_unit REAL NOT NULL CHECK (price_unit >= 0),
            subtotal REAL GENERATED ALWAYS AS (product_amount_sell * price_unit) STORED,
            FOREIGN KEY (venda_id) REFERENCES vendas(venda_id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
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
    # 2nd example: updates=("product_name", "Cool Shirt #123")
    
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

def sell_product(products_to_sell: list[tuple[int, int]]):
               # products_to_sell = [(product_id, amount)]
               # example:
               # products_to_sell = [(2, 3), (6, 1)]

    with sql.connect(db_path) as connection:
        cursor = connection.cursor()

        total_price = 0.0
        venda_items = []

        for product_id, qtde in products_to_sell:
            cursor.execute("SELECT product_price, product_stock FROM products WHERE product_id = ?", (product_id,))
            result = cursor.fetchone()

            if not result:
                raise ValueError(f"Produto com ID {product_id} não encontrado.")
            
            price_unit, stock = result

            if stock < qtde:
                raise ValueError(f"Estoque insuficiente para o produto ID {product_id}. Disponível: {stock}, solicitado: {qtde}")

            subtotal = price_unit * qtde
            total_price += subtotal
            venda_items.append((product_id, qtde, price_unit))

        # Criar a venda
        cursor.execute("INSERT INTO vendas (total_price) VALUES (?)", (total_price,))
        venda_id = cursor.lastrowid

        # Inserir os itens da venda
        for product_id, qtde, price_unit in venda_items:
            cursor.execute("""
                INSERT INTO venda_itens (venda_id, product_id, product_amount_sell, price_unit)
                VALUES (?, ?, ?, ?)
            """, (venda_id, product_id, qtde, price_unit))

            # Atualizar estoque
            cursor.execute("""
                UPDATE products
                SET product_stock = product_stock - ?
                WHERE product_id = ?
            """, (qtde, product_id))

        connection.commit()


def load_sales_history():
    with sql.connect(db_path) as connection:
        cursor = connection.cursor()

        # Recupera todas as vendas
        cursor.execute("SELECT venda_id, timestamp, total_price FROM vendas ORDER BY timestamp DESC")
        vendas = cursor.fetchall()

        historico = []

        for venda_id, timestamp, total_price in vendas:
            # Para cada venda, recupera os produtos associados
            cursor.execute("""
                SELECT p.product_name, vi.product_amount_sell, vi.price_unit, vi.subtotal
                FROM venda_itens vi
                JOIN products p ON p.product_id = vi.product_id
                WHERE vi.venda_id = ?
            """, (venda_id,))
            itens = cursor.fetchall()

            itens_formatados = [{
                "product_name": item[0],
                "quantity": item[1],
                "price_unit": item[2],
                "subtotal": item[3]
            } for item in itens]

            historico.append({
                "venda_id": venda_id,
                "timestamp": timestamp,
                "total_price": total_price,
                "produtos": itens_formatados
            })

        return historico

