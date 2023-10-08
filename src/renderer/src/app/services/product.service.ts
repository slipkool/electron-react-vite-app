import axios from 'axios'
import { Product } from '@renderer/app/models/product.model'
import { PRODUCTS_ENDPOINT } from '../core/appConstants'
import { loadAbort } from '@renderer/utilities/load-abort-axios.utility'
import { CreateProductDto } from '../dtos/product.dto'

const getProductUrl = (id): string => `${PRODUCTS_ENDPOINT}/${id}`

const http = axios.create({
  baseURL: import.meta.env.RENDERER_VITE_API_URL ?? 'http://localhost:4000'
})

export const fetchProductsV2 = () => {
  const controller = loadAbort()
  return { call: http.get<Product[]>(PRODUCTS_ENDPOINT, { signal: controller.signal }), controller }
}

const responseBody = (response) => response.data
export const fetchProducts = () => {
  return http.get<Product[]>(PRODUCTS_ENDPOINT).then(responseBody)
}

export const deleteProduct = (id) => {
  return http.delete(getProductUrl(id)).then(responseBody)
}

export const addProduct = (product: CreateProductDto) => {
  return http.post(PRODUCTS_ENDPOINT, product).then(responseBody)
}
