import http from '@renderer/conf/http-common'
import { ORDERS_ENDPOINT } from '../core/appConstants'
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto'
import { Order } from '../models/order.model'

const getOrderUrl = (id): string => `${ORDERS_ENDPOINT}/${id}`

const responseBody = (response) => response.data

const fetchOrders = () => {
  return http.get<Order[]>(ORDERS_ENDPOINT).then(responseBody)
}

const fetchOrderById = (id) => {
  return http.get<Order[]>(getOrderUrl(id)).then(responseBody)
}

const deleteOrder = (id) => {
  return http.delete(getOrderUrl(id)).then(responseBody)
}

const addOrder = (order: CreateOrderDto) => {
  return http.post(ORDERS_ENDPOINT, order).then(responseBody)
}

const updateOrder = (id, order: UpdateOrderDto) => {
  return http.patch(getOrderUrl(id), order).then(responseBody)
}

const OrderService = {
  fetchOrders,
  fetchOrderById,
  deleteOrder,
  addOrder,
  updateOrder
}

export default OrderService
