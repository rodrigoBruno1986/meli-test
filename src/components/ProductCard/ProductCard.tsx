import React from 'react';
import { ProductCardProps } from '../../utils/types';
import './style.css';

const ProductCard: React.FC<ProductCardProps> = ({
  picture,
  price,
  title,
  location,
  onClick,
}) => {
  return (
    <div className='card' onClick={onClick}>
      <div className='card-image-wrapper'>
        <img src={picture} alt={title} className='card-image' />
      </div>
      <div className='card-content'>
        <p className='price'>
          {price.currency} ${price.amount.toFixed(2)}
        </p>
        <h3>{title}</h3>

        <p>{location}</p>
      </div>
    </div>
  );
};

export default ProductCard;
