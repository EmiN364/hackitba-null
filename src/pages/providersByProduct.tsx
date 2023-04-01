import { useState, useEffect } from 'react'
import axios from 'axios'

type Provider = {
  id: number
  name: string
}

const Providers = () => {
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    const fetchProvider = async () => {
      const response = await axios.get('/api/providersByProduct')
      setProviders(response.data)
    }

    fetchProvider()
  }, [])

  return (
    <div>
      <h1>Providers for Product x</h1>
      <ul>
        {providers.map((provider) => (
          <li key={provider.id}>
            {provider.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Providers
