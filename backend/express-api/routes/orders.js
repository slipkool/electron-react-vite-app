import express from 'express';
import asyncify from 'express-asyncify';
import { OrderController } from '../controllers/orders.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';
import { createDirectoryMiddleware } from '../middlewares/createDirectoryMiddleware.js';

export const createOrdersRouter = ({
  orderModel,
  clientModel,
  orderProductModel
}) => {
  const orderRouter = asyncify(express.Router());

  const orderController = new OrderController({
    orderModel,
    clientModel,
    orderProductModel
  });

  orderRouter.get('/', orderController.getAll)
  orderRouter.post('/', orderController.create)

  orderRouter.post('/update/:id', orderController.update)

  orderRouter.get('/:id', orderController.getById)
  orderRouter.delete('/:id', orderController.delete)
  orderRouter.patch('/:id', orderController.update)

  orderRouter.post('/upload-image/:id', createDirectoryMiddleware, uploadMiddleware, orderController.uploadImage)
  orderRouter.get('/upload-image/:id/:image', orderController.getUploadImage)

  return orderRouter
}
