import React from 'react';
import { ProductCardProps } from '../../utils/types';
import './style.css';

const ProductCard: React.FC<ProductCardProps> = ({
  picture,
  price,
  title,
  location,
}) => {
  return (
    <div className='card'>
      <img src={picture} alt={title} className='card-picture' />
      <div className='card-content'>
        <h3>{title}</h3>
        <p>
          Precio: {price.currency} ${price.amount.toFixed(2)}
        </p>
        <p>Ubicación: {location}</p>
      </div>
    </div>
  );
};

export default ProductCard;
