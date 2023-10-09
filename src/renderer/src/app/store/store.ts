import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '@renderer/app/store/features/orders/orderSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import productSlice from '@renderer/app/store/features/products/productSlice'

export const store = configureStore({
  reducer: {
    orders: orderSlice,
    products: productSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
