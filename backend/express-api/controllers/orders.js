import { validateOrder, validatePartialOrder } from '../schemas/orders.js'

export class OrderController {
  constructor ({ orderModel, clientModel, orderProductModel }) {
    this.orderModel = orderModel
    this.clientModel = clientModel
    this.orderProductModel = orderProductModel
  }

  getAll = async (req, res) => {
    const orders = await this.orderModel.getAll()
    for (const key in orders) {
      const cliente = await this.clientModel.getById({ id: orders[key].cliente_id })
      orders[key].cliente = cliente
      const productos = await this.orderProductModel.getProductsByOrderId({ id: orders[key].id })
      orders[key].productos = productos
    }
    res.json(orders)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const product = await this.orderModel.getById({ id })
    if (product) return res.json(product)
    res.status(404).json({ message: 'Prueba de laboratorio no encontrado' })
  }

  create = async (req, res) => {
    const result = validateOrder(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newProduct = await this.orderModel.create({ input: result.data })

    if (newProduct) return res.status(201).json(newProduct)
    res.status(404).json({ message: 'Error al guardar la prueba de laboratorio' })
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.orderModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Prueba de laboratorio no encontrado' })
    }

    return res.json({ id, message: 'Prueba de laboratorio eliminado' })
  }

  update = async (req, res) => {
    const result = validatePartialOrder(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedProduct = await this.orderModel.update({ id, input: result.data })

    if (updatedProduct) return res.json(updatedProduct)
    res.status(404).json({ message: 'Error al actualizar la Prueba de laboratorio' })
  }
}
