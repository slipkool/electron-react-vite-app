import express, { json } from 'express';
import { createClientRouter } from './routes/clients.js';
import { createProductsRouter } from './routes/products.js';
import { createOrdersRouter } from './routes/orders.js';
import { corsMiddleware } from './middlewares/cors.js';
import 'dotenv/config';

export const createApp = ({
  clientModel,
  productModel,
  orderModel,
  orderProductModel
}) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by');

  app.use('/clients', createClientRouter({ clientModel }))
  app.use('/products', createProductsRouter({ productModel }))
  app.use(
    '/orders',
    createOrdersRouter({ orderModel, clientModel, orderProductModel })
  );

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  });
}
