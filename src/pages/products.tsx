import { useState, useEffect } from 'react'
import axios from 'axios'

type Product = {
  id: number
  name: string
  stock: number
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            Producto {product.name}. Stock Restante: ({product.stock}).
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products
