import React, { useState } from 'react';
import SearchBar from '../src/components/SearchBar/SearchBar';
import { Product } from './utils/types';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import ProductDescription from './components/ProductDescription/ProductDescription';
import { searchProducts } from './services/api';
import './App.css';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    console.log('Buscando productos para:', query);
    setIsLoading(true);

    try {
      const products = await searchProducts(query);
      setSearchResults(products);
      navigate('/');
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
        <Routes>
          <Route
            path='/'
            element={<ProductList products={searchResults} categories={[]} />}
          />
          <Route path='/items/:id' element={<ProductDescription />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
