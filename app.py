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

# criar produto
@app.route('/produtos', methods=["POST"])
def criar_produto():
    body = request.get_json()

    produto = body['product']
    nome = produto[0]
    preco = produto[1]
    estoque = produto[2]
    codigo_de_barra = produto[3]
    endereco_imagem = produto[4]

    insert_new_product(nome, preco, estoque, codigo_de_barra, endereco_imagem)

    return jsonify({ "produto_adicionado": body })

# atualizar produto
@app.route('/produtos/<int:id>', methods=["PATCH"])
def atualizar_produto(id: int):
    body = request.get_json()

    updates_ = body['updates']
    update_product(id, *updates_)

    updated_product = get_product(id)

    return jsonify({ "produto_atualizado": updated_product })

@app.route('/produtos/<int:id>', methods=["DELETE"])
def remover_produto(id: int):
    remove_product(id)
    return jsonify({ "Produto": "removido." })

app.run(port=8080, host='localhost', debug=True)
