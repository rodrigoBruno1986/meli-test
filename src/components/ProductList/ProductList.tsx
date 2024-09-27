import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { ProductListProps } from '../../utils/types';

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
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
