import axios from 'axios';
import { Product } from '../utils/types';
const API_URL = process.env.REACT_APP_API_URL;

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}${query}`);

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

  return products;
};
