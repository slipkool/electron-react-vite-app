import {
  validateProduct,
  validatePartialProduct
} from '../schemas/products.js';

export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel
  }

  getAll = async (req, res) => {
    const products = await this.productModel.getAll()
    res.json(products)
  };

  getById = async (req, res) => {
    const { id } = req.params
    const product = await this.productModel.getById({ id })
    if (product) return res.json(product)
    res.status(404).json({ message: 'Prueba de laboratorio no encontrado' })
  };

  create = async (req, res) => {
    const result = validateProduct(req.body)

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newProduct = await this.productModel.create({ input: result.data })

    if (newProduct) return res.status(201).json(newProduct)
    res
      .status(404)
      .json({ message: 'Error al guardar la prueba de laboratorio' })
  };

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.productModel.delete({ id })

    if (result === false) {
      return res
        .status(404)
        .json({ message: 'Prueba de laboratorio no encontrado' })
    }

    return res.json({ id, message: 'Prueba de laboratorio eliminado' })
  };

  update = async (req, res) => {
    const result = validatePartialProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedProduct = await this.productModel.update({
      id,
      input: result.data
    });

    if (updatedProduct) return res.json(updatedProduct)
    res
      .status(404)
      .json({ message: 'Error al actualizar la Prueba de laboratorio' })
  };
}
