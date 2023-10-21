import http from "@renderer/conf/http-common";
import { Product } from "@renderer/app/models/product.model";
import { PRODUCTS_ENDPOINT } from "../core/appConstants";
//import { loadAbort } from '@renderer/utilities/load-abort-axios.utility'
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";

const getProductUrl = (id): string => `${PRODUCTS_ENDPOINT}/${id}`;

/* const fetchProductsV2 = () => {
  const controller = loadAbort()
  return { call: http.get<Product[]>(PRODUCTS_ENDPOINT, { signal: controller.signal }), controller }
} */

const responseBody = (response) => response.data;

const fetchProducts = () => {
  return http.get<Product[]>(PRODUCTS_ENDPOINT).then(responseBody);
};

const deleteProduct = (id) => {
  return http.delete(getProductUrl(id)).then(responseBody);
};

const addProduct = (product: CreateProductDto) => {
  return http.post(PRODUCTS_ENDPOINT, product).then(responseBody);
};

const updateProduct = (id, product: UpdateProductDto) => {
  return http.patch(getProductUrl(id), product).then(responseBody);
};

const ProductService = {
  fetchProducts,
  deleteProduct,
  addProduct,
  updateProduct,
};

export default ProductService;
