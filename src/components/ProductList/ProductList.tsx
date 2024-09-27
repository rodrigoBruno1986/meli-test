import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ProductListProps } from '../../utils/types';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/items/${id}`); // Esta línea es importante
  };

  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          onClick={() => handleProductClick(product.id)} // Esta línea también es crucial
          picture={product.picture}
          price={product.price}
          title={product.title}
          condition={product.condition}
          location='Capital Federal'
        />
      ))}
    </div>
  );
};

export default ProductList;
