import { Router } from "express";
import { OrderController } from "../controllers/orders.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

export const createOrdersRouter = ({
  orderModel,
  clientModel,
  orderProductModel,
}) => {
  const orderRouter = Router();

  const orderController = new OrderController({
    orderModel,
    clientModel,
    orderProductModel,
  })

  orderRouter.get("/", orderController.getAll);
  orderRouter.post("/", orderController.create);

  orderRouter.post("/update/:id", orderController.update);

  orderRouter.get("/:id", orderController.getById);
  orderRouter.delete("/:id", orderController.delete);
  orderRouter.patch("/:id", orderController.update);

  orderRouter.post(
    "/upload-image/:id",
    uploadMiddleware,
    orderController.uploadImage,
  )
  orderRouter.get("/upload-image/:id/:image", orderController.getUploadImage);

  return orderRouter;
}
