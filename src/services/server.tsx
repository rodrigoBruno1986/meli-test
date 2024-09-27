import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

// Endpoint para buscar productos
app.get('/api/items', async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}`
    );
    const items = response.data.results.slice(0, 4).map((item: any) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: (item.price % 1).toFixed(2),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));
    res.json({
      author: { name: 'TuNombre', lastname: 'TuApellido' },
      items,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar productos' });
  }
});

// Endpoint para obtener detalle del producto
app.get('/api/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const itemResponse = await axios.get(
      `https://api.mercadolibre.com/items/${id}`
    );
    const descriptionResponse = await axios.get(
      `https://api.mercadolibre.com/items/${id}/description`
    );

    const item = {
      id: itemResponse.data.id,
      title: itemResponse.data.title,
      price: {
        currency: itemResponse.data.currency_id,
        amount: Math.floor(itemResponse.data.price),
        decimals: (itemResponse.data.price % 1).toFixed(2),
      },
      picture: itemResponse.data.pictures[0].secure_url,
      condition: itemResponse.data.condition,
      free_shipping: itemResponse.data.shipping.free_shipping,
      sold_quantity: itemResponse.data.sold_quantity,
      description: descriptionResponse.data.plain_text,
    };

    res.json({
      author: { name: 'TuNombre', lastname: 'TuApellido' },
      item,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles del producto' });
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
