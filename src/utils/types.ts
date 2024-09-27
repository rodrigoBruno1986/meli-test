// Tipos de las props del componente SearchBar
export interface SearchBarProps {
  onSearch: (query: string) => void;
}

// Tipos para los datos de los productos que recibimos de la API de Mercado Libre
export interface Product {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
}

// Tipos para la respuesta de búsqueda de productos
export interface ProductSearchResponse {
  author: {
    name: string;
    lastname: string;
  };
  items: Product[];
}

// Props para el componente ProductCard
export interface ProductCardProps
  extends Pick<Product, 'title' | 'picture' | 'price' | 'condition'> {
  location: string;
  onClick?: () => void; // Añadido para manejar el clic en el card
}

// Props para el componente ProductList
export interface ProductListProps {
  products: Product[];
  categories: string[];
}

// Nuevos tipos para las consultas y parámetros en el servidor
export interface Query {
  q: string; // Para la búsqueda de productos
}

export interface Params {
  id: string; // Para los detalles del producto
}

export const fetchProductDetails = async (id: string) => {
  const response = await fetch(`http://localhost:3001/api/items/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los detalles del producto');
  }
  return await response.json();
};

export interface ProductDetails extends Product {
  sold_quantity: number;
  description: string;
}
