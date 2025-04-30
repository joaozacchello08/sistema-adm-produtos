from src.adm_db import start_db, insert_new_product, remove_product, update_product, get_product, get_products
from flask import Flask, jsonify, request

start_db()

app = Flask("main")

# get produtos
@app.route('/produtos', methods=["GET"])
def get_livros():
    db_response = get_products()
    return jsonify(db_response)

# get produto
@app.route('/produtos/<int:id>', methods=["GET"])
def get_produto(id: int):
    db_response = get_product(id)
    return jsonify(db_response)

# create produto
@app.route('/produtos', methods=["POST"])
def criar_produto():
    body = request.get_json()
    return jsonify(body)

app.run(port=8080, host='localhost', debug=True)
