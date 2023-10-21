import { Router } from 'express';
import { ProductController } from '../controllers/products.js';

export const createProductsRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })

  productRouter.get('/', productController.getAll)
  productRouter.post('/', productController.create)

  productRouter.post('/update/:id', productController.update)

  productRouter.get('/:id', productController.getById)
  productRouter.delete('/:id', productController.delete)
  productRouter.patch('/:id', productController.update)

  return productRouter
};
