import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

export default function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      product: [
        product.name_,
        parseFloat(product.price),
        parseInt(product.stock),
        product.barcode,
        product.image
      ]
    }

    try {
      await fetch(`http://localhost:8080/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      })
      alert("Produto atualizado com sucesso!")
    } catch (error) {
      alert("Erro ao atualizar produto.")
    }
  }

  if (!product) return <div>Carregando...</div>

  return (
    <div className="newProduct-content">
      <Header />
      <form className="product-form" onSubmit={handleSubmit}>
        <label>Nome:
          <input name="name_" value={product.name_} onChange={handleChange} required />
        </label>
        <label>Preço:
          <input name="price" type="number" step="0.01" value={product.price} onChange={handleChange} required />
        </label>
        <label>Estoque:
          <input name="stock" type="number" value={product.stock} onChange={handleChange} required />
        </label>
        <label>Código de barras:
          <input name="barcode" value={product.barcode} onChange={handleChange} required />
        </label>
        <label>Imagem:
          <img src={product.image} alt="preview" style={{ maxWidth: "160px" }} />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  )
}
