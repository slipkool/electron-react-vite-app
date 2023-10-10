import { Client } from './client.model'
import { Product } from './product.model'

export interface Order {
  id: number
  client: Client
  patient: string
  paid: boolean
  products: Product[]
  total: number
  partialPayment: number
  images: string[]
}
