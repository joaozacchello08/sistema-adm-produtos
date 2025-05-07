import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function RemoveProduct() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/produtos/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error("Erro ao buscar produto:", error))
    }, [id])

    const handleDelete = () => {
        fetch(`http://localhost:8080/produtos/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                alert("Produto removido com sucesso.")
                navigate('/')
            })
            .catch(error => console.error("Erro ao deletar produto:", error))
    }

    if (!product) {
        return <p>Carregando produto...</p>
    }

    const [productId, name_, price, stock, barcode, image] = product

    return (
        <div className="remove-product-content">
            <Header />

            <div>
                <h1>Você tem CERTEZA que quer apagar o produto {id}?</h1>
                <div className="produto">
                    <img src={image} alt={name_} width={256} height={512} />
                    <p><strong>{name_}</strong></p>
                    <p>Preço: R$ {price}</p>
                    <p>Estoque: {stock}</p>
                    <p>Código de Barras: {barcode}</p>
                    <p>ID: {productId}</p>
                </div>
                <p style={{ color: "red" }}>
                    *O item será removido da base de dados. Você poderá adicioná-lo novamente sem problemas.
                </p>
                <div>
                    <button className="remove-product-buttons" id="sim" onClick={handleDelete}>
                        <span className="button_top">SIM</span>
                    </button>
                    <button className="remove-product-buttons" id="nao" onClick={() => navigate(-1)}>
                        <span className="button_top">NÃO</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
