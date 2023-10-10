import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ProductService from '@renderer/app/services/product.service'
import {
  CreateProductDto,
  UpdateProductDto,
  productDtoToProductModel,
  productDtoToProductModelList
} from '@renderer/app/dtos/product.dto'
import { Product } from '@renderer/app/models/product.model'

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  searchData: Product[]
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searchData: []
}

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const result = await ProductService.fetchProducts()
  return productDtoToProductModelList(result)
})

export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
  const result = await ProductService.deleteProduct(id)
  return result
})

export const addProduct = createAsyncThunk('products/create', async (product: CreateProductDto) => {
  const result = await ProductService.addProduct(product)
  return productDtoToProductModel(result)
})

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: UpdateProductDto) => {
    const result = await ProductService.updateProduct(product.id, product)
    return productDtoToProductModel(result)
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      console.log(action.payload)
      state.searchData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = [...action.payload]
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        )
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        const { id } = action.payload
        if (id) {
          state.products = state.products.filter((ele) => ele.id !== parseInt(id))
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  }
})

// Selectors
export const selectProducts = (state): Product[] => state.products.products
export const selectLoadingState = (state): boolean => state.products.loading
export const selectError = (state): string => state.products.error

export default productSlice.reducer

export const { searchProduct } = productSlice.actions
