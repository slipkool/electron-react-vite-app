import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CreateOrderDto, UpdateOrderDto } from '@renderer/app/dtos/order.dto'
import { Order } from '@renderer/app/models/order.model'
import { optionsClients, optionsProducts } from '@renderer/data'

const initialState: Order[] = []

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<UpdateOrderDto>) => {
      const index = state.findIndex((order) => order.id === action.payload.id)
      const prevData = state[index]
      state[index] = {
        ...prevData,
        ...action.payload
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
        ...action.payload,
        id: Math.floor(Math.random() * 1000) + 1,
        client: {
          id: client.id,
          name: client.name
        },
        createdAt: new Date(),
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
