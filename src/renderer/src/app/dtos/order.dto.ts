import { Client } from '../models/client.model'
import { Order } from '../models/order.model'
import { Product } from '../models/product.model'

export interface CreateOrderDto extends Omit<Order, 'id' | 'client' | 'products'> {
  clientId: Client['id']
  productsIds: Product['id'][]
}

export interface UpdateOrderDto extends Partial<CreateOrderDto> {
  id: number
}
