import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import {
  CreateOrderDto,
  UpdateOrderDto,
  orderDtoToOrderModel,
  orderDtoToOrderModelList
} from '@renderer/app/dtos/order.dto'
import { Order } from '@renderer/app/models/order.model'
import OrderService from '@renderer/app/services/order.service'
import { RootState } from '../store'

export interface OrderState {
  orders: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null
}

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const result = await OrderService.fetchOrders()
  return orderDtoToOrderModelList(result)
})

export const deleteOrder = createAsyncThunk('products/delete', async (id: number) => {
  const result = await OrderService.deleteOrder(id)
  return result
})

export const addOrder = createAsyncThunk('products/create', async (product: CreateOrderDto) => {
  const result = await OrderService.addOrder(product)
  return orderDtoToOrderModel(result)
})

export const updateOrder = createAsyncThunk('products/update', async (product: UpdateOrderDto) => {
  const result = await OrderService.updateOrder(product.id, product)
  return orderDtoToOrderModel(result)
})

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = [...action.payload]
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = state.orders.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        )
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false
        const { id } = action.payload
        if (id) {
          state.orders = state.orders.filter((ele) => ele.id !== parseInt(id))
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  }
})

// Selectors
const orders = (state: RootState): Order[] => state.orders.orders
export const dataGridSelector = createSelector([orders], (orders) => {
  console.log(orders)
  return null
})

export default orderSlice.reducer
