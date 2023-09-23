import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@renderer/features/orders/orderSlice'

export const store = configureStore({
  reducer: {
    orders: orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
