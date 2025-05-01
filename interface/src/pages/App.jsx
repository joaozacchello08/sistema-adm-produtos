import { useState, useEffect } from 'react'
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
          <img src={image} />
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
