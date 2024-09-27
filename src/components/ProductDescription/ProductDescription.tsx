import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails } from '../../services/api';
import { ProductDetails } from '../../utils/types';
import './style.css';

const ProductDescription: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setError('El ID del producto es inválido.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error al obtener los detalles del producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No se encontraron detalles del producto.</p>;
  }

  return (
    <div className='product-description'>
      <div className='content-img'>
        <div className='img-product'>
          <img
            src={product.picture}
            alt={product.title}
            className='product-image'
          />
        </div>
      </div>
      <div className='general-description'>
        <h2>{product.title}</h2>

        <p className='product-price'>
          Precio: {product.price.amount} {product.price.currency}
        </p>
        <p className='product-condition'>Condición: {product.condition}</p>
        <p className='product-description-text'>
          Descripción: {product.description}
        </p>
        <p className='product-sold-quantity'>
          Vendidos: {product.sold_quantity}
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
