import path from 'path';
import * as url from 'url';
import { validateOrder, validatePartialOrder } from '../schemas/orders.js';

export class OrderController {
  constructor ({ orderModel, clientModel, orderProductModel }) {
    this.orderModel = orderModel
    this.clientModel = clientModel
    this.orderProductModel = orderProductModel
  }

  getAll = async (req, res) => {
    const orders = await this.orderModel.getAll()
    for (const key in orders) {
      await this.fillOrderInfo(
        orders[key],
        orders[key].id,
        orders[key].cliente_id
      )
    }
    res.json(orders)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const order = await this.orderModel.getById({ id })
    if (order) {
      await this.fillOrderInfo(order, order.id, order.cliente_id)
      return res.json(order)
    }
    res.status(404).json({ message: 'Orden no encontrada' })
  }

  create = async (req, res) => {
    const result = validateOrder(req.body)

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newOrder = await this.orderModel.create({ input: result.data })

    if (newOrder) {
      await this.fillOrderInfo(newOrder, newOrder.id, newOrder.cliente_id)
      return res.status(201).json(newOrder)
    }
    res.status(404).json({ message: 'Error al guardar la orden' })
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.orderModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }

    return res.json({ id, message: 'Orden eliminada' })
  }

  update = async (req, res) => {
    const result = validatePartialOrder(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedProduct = await this.orderModel.update({
      id,
      input: result.data
    });

    if (updatedProduct) {
      await this.fillOrderInfo(
        updatedProduct,
        updatedProduct.id,
        updatedProduct.cliente_id
      )
      return res.json(updatedProduct)
    }
    res.status(404).json({ message: 'Error al actualizar la orden' })
  }

  fillOrderInfo = async (order, orderId, clientId) => {
    const cliente = await this.clientModel.getById({ id: clientId })
    order.cliente = cliente
    const productos = await this.orderProductModel.getProductsByOrderId({
      id: orderId
    });
    order.productos = productos
  }

  uploadImage = async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(200).json({ message: 'No hay archivos para cargar' })
    }

    const { id } = req.params
    const updatedProduct = await this.orderModel.updateImage({
      id,
      input: res.req.files
    });

    if (updatedProduct) {
      return res.status(200).json({
        message: "Archivos cargados satisfactoriamente",
        files: res.req.files
          .map((item) => {
            return item.path
          })
          .join(", "),
      });
    }
    res
      .status(404)
      .json({ message: 'Error al actualizar las imagenes de la orden' })
  }

  getUploadImage = async (req, res) => {
    const FILE_UPLOAD_FOLDER = "../uploads/";
    const { id, image } = req.params
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

    const filePath = path.resolve(
      __dirname,
      FILE_UPLOAD_FOLDER,
      `${id}/${image}`
    )
    return res.sendFile(filePath)
  }
}
