import { Product } from '@renderer/app/models/product.model'

export interface ProductDto {
  id: number
  nombre: string
  precio: number
}

export interface CreateProductDto extends Omit<Product, 'id'> {}

export const productDtoToProductModel = (productDto: ProductDto): Product => {
  const product: Product = {
    id: productDto.id,
    name: productDto.nombre,
    price: productDto.precio
  }
  return product
}

export const productDtoToProductModelList = (productDtoList: ProductDto[]): Product[] => {
  return productDtoList.map((productDto) => productDtoToProductModel(productDto))
}
