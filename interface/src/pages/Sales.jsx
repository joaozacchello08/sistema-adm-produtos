import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function Sales() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/vendas")
      .then(res => res.json())
      .then(data => setSales(data))
  }, [])

  return (
    <div className="app-content">
      <Header />
      {sales.map(([saleId, productName, quantity, total, date], index) => (
        <div key={index} className="product">
          <p><strong>Venda #{saleId}</strong></p>
          <p>Produto: {productName}</p>
          <p>Quantidade: {quantity}</p>
          <p>Total: R${total}</p>
          <p>Data: {date}</p>
        </div>
      ))}
    </div>
  )
}
