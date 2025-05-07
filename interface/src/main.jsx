import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App.jsx'
import NewProduct from './pages/NewProduct.jsx'
// import SellProduct from './pages/SellProduct.jsx'
// import Sales from './pages/Sales.jsx'
import EditProduct from './pages/EditProduct.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/adicionar_produto', element: <NewProduct /> },
  { path: '/editar_produto/:id', element: <EditProduct /> },
  // { path: '/vender_produto/:id', element: <SellProduct /> },
  // { path: '/vendas', element: <Sales /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
