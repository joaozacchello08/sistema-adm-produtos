from src.adm_db import start_db, insert_new_product, remove_product, update_product, get_product

start_db()

# test suit
if __name__ == "__main__":
    insert_new_product("a", 2.99, 3, "12345678", "/")
    print(get_product(1))
