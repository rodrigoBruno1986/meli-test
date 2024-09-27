import React, { useState } from 'react';
import SearchBar from '../src/components/SearchBar/SearchBar';
import { Product } from './utils/types';
import ProductList from './components/ProductList/ProductList';
import { searchProducts } from './services/api'; // Importamos la función de la API
import './App.css';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    console.log('Buscando productos para:', query);
    setIsLoading(true);

    try {
      const products = await searchProducts(query); // Usamos la función de búsqueda desde api.ts
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
        <SearchBar onSearch={handleSearch} />
      </header>

      {isLoading ? (
        <p>Cargando productos...</p>
      ) : (
        <ProductList products={searchResults} />
      )}
    </div>
  );
};

export default App;
