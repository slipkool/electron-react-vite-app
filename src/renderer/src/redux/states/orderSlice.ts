import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { CreateOrderDto, UpdateOrderDto } from '@renderer/app/dtos/order.dto'
import { Order } from '@renderer/app/models/order.model'
import { optionsClients, optionsProducts } from '@renderer/data'
import { RootState } from '../store'

const initialState: Order[] = []

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<UpdateOrderDto>) => {
      const clientId = action.payload.clientId ?? 0
      const client = optionsClients.find((client) => {
        return client.id === +clientId
      })

      const productsIds = action.payload.productsIds ?? []
      const products = optionsProducts.filter((product) => productsIds.includes(product.id))

      if (!client) {
        throw new Error('Error al crear la orden')
      }
      const index = state.findIndex((order) => order.id === action.payload.id)
      const prevData = state[index]
      state[index] = {
        ...prevData,
        client: {
          id: client.id,
          name: client.name
        },
        updateAt: new Date(),
        images: [],
        paid: action.payload.paid ?? false,
        partialPayment: action.payload.partialPayment ?? 0,
        patient: action.payload.patient ?? '',
        total: action.payload.total ?? 0,
        products: products
      }
    },
    createOrder: (state, action: PayloadAction<CreateOrderDto>) => {
      const client = optionsClients.find((client) => {
        return client.id === +action.payload.clientId
      })

      const products = optionsProducts.filter((product) =>
        action.payload.productsIds.includes(product.id)
      )

      if (!client) {
        throw new Error('Error al crear la orden')
      }

      const newOrder: Order = {
        id: Math.floor(Math.random() * 1000) + 1,
        client: {
          id: client.id,
          name: client.name
        },
        createdAt: new Date(),
        updateAt: new Date(),
        images: [],
        paid: action.payload.paid,
        partialPayment: action.payload.partialPayment,
        patient: action.payload.patient,
        total: action.payload.total,
        products: products
      }
      state.push(newOrder)
    },
    removeOrder: (state, action) => {
      const orderFound = state.find((order) => order.id === action.payload)
      if (orderFound) {
        state.splice(state.indexOf(orderFound), 1)
      }
    }
  }
})

export const { updateOrder, createOrder, removeOrder } = orderSlice.actions

export default orderSlice.reducer

const orders = (state: RootState): Order[] => state.orders

export const findOrderById = createSelector(
  [orders, (orders, id: number): number => id],
  (orders, id): Order | undefined => {
    return orders.find((order) => order.id === id)
  }
)

export const findLastOrder = createSelector([orders], (orders): Order | undefined => {
  return orders[orders.length - 1]
})
