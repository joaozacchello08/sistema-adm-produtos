import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

export default function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [image, setImage] = useState("")

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result) // armazena imagem em base64
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fieldMap = {
      name_: "product_name",
      price: "product_price",
      stock: "product_stock",
      barcode: "product_barcode"
    }

    const updates = Object.entries(product)
      .filter(([key, value]) => value !== "")
      .filter(([key]) => fieldMap[key])
      .map(([key, value]) => [fieldMap[key], value])

    // Adiciona imagem se uma nova foi enviada
    if (image) {
      updates.push(["product_image_path", image])
    }

    if (updates.length === 0) {
      alert("Nenhuma alteração detectada.")
      return
    }

    try {
      const res = await fetch(`http://localhost:8080/produtos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      })

      const result = await res.text()
      console.log(result)
      alert("Produto atualizado com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error)
      alert("Erro ao atualizar o produto.")
    }
  }

  if (!product) return <div>Carregando...</div>

  return (
    <div className="newProduct-content">
      <Header />
      <form className="product-form" onSubmit={handleSubmit}>
        <p style={{ color: "red" }}>* DEIXE O CAMPO EM BRANCO CASO NÃO QUEIRA EDITÁ-LO</p>

        <label>Nome:
          <input name="name_" value={product.name_} onChange={handleChange} />
        </label>
        <label>Preço:
          <input name="price" type="number" step="0.01" value={product.price} onChange={handleChange} />
        </label>
        <label>Estoque:
          <input name="stock" type="number" value={product.stock} onChange={handleChange} />
        </label>
        <label>Código de barras:
          <input name="barcode" value={product.barcode} onChange={handleChange} />
        </label>
        {/* <label>Imagem atual:
          <img src={product.image} alt="preview" style={{ maxWidth: "160px" }} />
        </label> */}
        <label>Alterar imagem:
          {image && <img src={image} alt="nova" style={{ maxWidth: '256px' }} />}
          <input
            type="file"
            accept="image/png"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  )
}
