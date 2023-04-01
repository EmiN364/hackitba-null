import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiHandler } from 'next';
import { useEffect, useState } from 'react';

import supabase from '../lib/supabase';

import Products from './prods';
import Providers from './Providers';

type Product = {
  id: number
  name: string
  stock: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    }

    fetchProducts()
  }, [])

  return (<>
    <Products />
    <Providers />
  </>)
}
