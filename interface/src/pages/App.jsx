import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="app-content">
      <Header />

      {products.map(([id, name_, price, stock, barcode, image]) => (
        <div key={id} className="product">
          <div className="product-actions">
            <Link to={`/editar_produto/${id}`} className="edit-button" title="Editar produto">✏️</Link>
            <Link to={`/vender_produto/${id}`} className="sell-button" title="Vender produto">✔️</Link>
          </div>

          <img src={image} alt={name_} />
          <p>{name_}</p>
          <p>Preço: R${price}</p>
          <p>Estoque: {stock}</p>
          <p>Código de Barras: {barcode}</p>
          <p>Id: {id}</p>
        </div>
      ))}
    </div>
  )
}
