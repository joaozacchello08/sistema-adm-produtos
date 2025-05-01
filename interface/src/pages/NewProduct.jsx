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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    //PAROU AQUI 8======D
    //REGISTRAR O PRODUTO (FAZER A REQUEST)
    //CRIAR ROTA PARA SALVAR O BLOB DA IMAGEM
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
          />
        </label>

        <label>
          Preço:
          <input
            type="number"
            placeholder="Preço do produto..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Estoque:
          <input
            type="number"
            step={1}
            min={0}
            placeholder="Estoque do produto..."
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>

        <label>
          Código de barras:
          <input
            type="text"
            placeholder="Código de barras do produto..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
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
