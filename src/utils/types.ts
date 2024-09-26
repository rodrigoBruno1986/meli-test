// Tipos de las props del componente SearchBar
export interface SearchBarProps {
  onSearch: (query: string) => void; // La función onSearch recibe un string
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

export interface ProductSearchResponse {
  author: {
    name: string;
    lastname: string;
  };
  items: Product[];
}
