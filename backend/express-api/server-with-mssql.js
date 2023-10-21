import { createApp } from './app.js';

import { ClientModel } from './models/mssql/client.js';
import { ProductModel } from './models/mssql/product.js';
import { OrderModel } from './models/mssql/order.js';
import { OrderProductModel } from './models/mssql/order_product.js';

createApp({
  clientModel: ClientModel,
  productModel: ProductModel,
  orderModel: OrderModel,
  orderProductModel: OrderProductModel
});
