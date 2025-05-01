import React, { useState } from 'react'
import Header from '../components/Header.jsx'

export default function NewProduct() {
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [barcode, setBarcode] = useState("")
  const [image, setImage] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedPrice = parseFloat(parseFloat(price).toFixed(2))
    const formattedStock = parseInt(stock, 10)

    if (isNaN(formattedPrice) || isNaN(formattedStock)) {
      alert("Preço deve ser um número válido com até 2 casas decimais e estoque deve ser um número inteiro.")
      return
    }

    const productData = {
      product: [
        productName,
        formattedPrice,
        formattedStock,
        barcode,
        image
      ]
    }

    try {
      const response = await fetch("http://localhost:8080/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      })

      const result = await response.json()
      console.log("Produto adicionado:", result)
      alert("Produto cadastrado com sucesso!")

      // Clear form
      setProductName("")
      setPrice("")
      setStock("")
      setBarcode("")
      setImage("")
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      alert("Erro ao cadastrar o produto.")
    }
  }

  return (
    <div className="newProduct-content">
      <Header />

      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Nome do produto:
          <input
            type="text"
            placeholder="Nome do produto..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>

        <label>
          Preço:
          <input
            type="number"
            placeholder="Preço do produto..."
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Estoque:
          <input
            type="number"
            step="1"
            min="0"
            placeholder="Estoque do produto..."
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>

        <label>
          Código de barras:
          <input
            type="text"
            placeholder="Código de barras do produto..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            required
          />
        </label>

        <label>
          Foto do produto:
          {image && <img src={image} alt="Produto" style={{ maxWidth: '512px', maxHeight: '512px' }} />}
          <input
            type="file"
            accept="image/png"
            onChange={handleImageChange}
          />
        </label>

        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  )
}
