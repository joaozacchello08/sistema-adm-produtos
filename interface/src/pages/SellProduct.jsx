import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

export default function SellProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  const handleSell = async () => {
    try {
      const response = await fetch(`http://localhost:8080/vendas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: id, quantity: parseInt(quantity) })
      })

      if (!response.ok) throw new Error()

      alert("Venda realizada com sucesso!")
    } catch {
      alert("Erro ao processar venda.")
    }
  }

  if (!product) return <div>Carregando...</div>

  return (
    <div className="newProduct-content">
      <Header />
      <div className="product-form">
        <h2>{product.name_}</h2>
        <p>Estoque disponível: {product.stock}</p>
        <label>Quantidade:
          <input type="number" min="1" max={product.stock} value={quantity} onChange={e => setQuantity(e.target.value)} />
        </label>
        <button onClick={handleSell}>Vender</button>
      </div>
    </div>
  )
}
