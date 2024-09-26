import React, { useState } from 'react';
import './style.css';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className='content_search'>
      <img src='meli_logo.png' alt='' />
      <form
        className='nav-search'
        action='https://www.mercadolibre.com.ar/jm/search'
        method='GET'
        role='search'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='nav-search-input'
          id='cb1-edit'
          name='as_word'
          placeholder='Buscar productos, marcas y más…'
          maxLength={120}
          value={query}
          onChange={handleInputChange}
        />
        <button type='submit' className='nav-search-btn'>
          <div role='img' aria-label='Buscar' className='nav-icon-search'></div>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
