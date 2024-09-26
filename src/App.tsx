import React, { useState } from 'react';
import SearchBar from '../src/components/SearchBar/SearchBar';
import axios from 'axios';
import { Product } from './utils/types';
import './App.css';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    console.log('Buscando productos para:', query);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
      );

      const products = response.data.results.slice(0, 4).map((item: any) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: (item.price % 1).toFixed(2),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      }));

      console.log('Productos recibidos:', products);
      setSearchResults(products);
    } catch (error) {
      console.error('Error al buscar los productos', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <SearchBar onSearch={handleSearch} />{' '}
      </header>

      {isLoading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {searchResults.map((product) => (
            <li key={product.id}>
              <img src={product.picture} alt={product.title} />
              <div className='product-info'>
                <div className='product-title'>{product.title}</div>
                <div className='product-condition'>{product.condition}</div>
                <div className='product-location'>Capital Federal</div>
              </div>
              <div className='product-price'>
                {product.price.amount} {product.price.currency}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
