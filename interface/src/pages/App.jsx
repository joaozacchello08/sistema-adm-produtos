import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="app-content">
      <header className="app-header">
        <nav>
          <ul>
            <li><a href="#">DASHBOARD</a></li>
            <li><Link to="/adicionar_produto">ADICIONAR PRODUTO</Link></li>
          </ul>
        </nav>
      </header>

      {products.map(([id, name_, price, stock, barcode, image]) => (
        <div key={id} id={id} className="product">
          <img src={image} />
          <p>{name_}</p>
          <p>Preço: R${price}</p>
          <p>Estoque: {stock}</p>
          <p>Código de Barras: {barcode}</p>
        </div>
      ))}
    </div>
  )
}
