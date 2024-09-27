// services/api.ts

import axios from 'axios';
import { Product, ProductDetails, ProductSearchResult } from '../utils/types';

const API_URL = process.env.REACT_APP_API_URL;

// Función para buscar productos
export const searchProducts = async (
  query: string
): Promise<ProductSearchResult> => {
  const response = await axios.get(`${API_URL}${query}`);
  console.log('Respuesta completa de la API:', response.data);

  // Asumiendo que la categoría se encuentra en response.data.filters
  const categories =
    response.data.filters
      .find((filter: any) => filter.id === 'category')
      ?.values.map((value: any) => value.name) || [];

  console.log('ssss', categories);

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

  return { products, categories }; // Devuelve un objeto con ambas propiedades
};

// Función para obtener los detalles de un producto
export const fetchProductDetails = async (
  id: string
): Promise<ProductDetails> => {
  const response = await axios.get(`https://api.mercadolibre.com/items/${id}`);
  const descriptionResponse = await axios.get(
    `https://api.mercadolibre.com/items/${id}/description`
  );

  if (!response.data || !descriptionResponse.data) {
    throw new Error('No se pudieron obtener los detalles del producto.');
  }

  const productDetails = {
    id: response.data.id,
    title: response.data.title,
    price: {
      currency: response.data.currency_id,
      amount: Math.floor(response.data.price),
      decimals: Math.round((response.data.price % 1) * 100),
    },
    picture: response.data.pictures[0].secure_url,
    condition: response.data.condition,
    free_shipping: response.data.shipping.free_shipping,
    sold_quantity: response.data.sold_quantity,
    description: descriptionResponse.data.plain_text,
  };

  return productDetails;
};
