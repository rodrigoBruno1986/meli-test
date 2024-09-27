// App.tsx

import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { Product, ProductSearchResult } from './utils/types'; // Asegúrate de importar el nuevo tipo
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import ProductDescription from './components/ProductDescription/ProductDescription';
import { searchProducts } from './services/api';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
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
      const { products, categories: newCategories }: ProductSearchResult =
        await searchProducts(query); // Asegúrate de que estás usando el tipo correcto
      setSearchResults(products);
      console.log('Categorías obtenidas:', newCategories); // Solo establecemos los productos
      setCategories(newCategories); // Establece las categorías también
      navigate('/'); // Redirige a la página de inicio
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
            element={
              <>
                <Breadcrumb categories={categories} />

                <ProductList products={searchResults} />
              </>
            }
          />
          <Route path='/items/:id' element={<ProductDescription />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
