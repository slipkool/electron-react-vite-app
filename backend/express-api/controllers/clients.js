import { validateClient, validatePartialClient } from '../schemas/clients.js';

export class ClientController {
  constructor ({ clientModel }) {
    this.clientModel = clientModel
  }

  getAll = async (req, res) => {
    const clients = await this.clientModel.getAll()
    res.json(clients)
  };

  getById = async (req, res) => {
    const { id } = req.params
    const client = await this.clientModel.getById({ id })
    if (client) return res.json(client)
    res.status(404).json({ message: 'Cliente no encontrado' })
  };

  create = async (req, res) => {
    const result = validateClient(req.body)

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newClient = await this.clientModel.create({ input: result.data })

    if (newClient) return res.status(201).json(newClient)
    res.status(400).json({ message: 'Error al guardar el cliente' })
  };

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.clientModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    return res.json({ id, message: 'Cliente eliminado' })
  };

  update = async (req, res) => {
    const result = validatePartialClient(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedClient = await this.clientModel.update({
      id,
      input: result.data
    });

    if (updatedClient) return res.json(updatedClient)
    res.status(400).json({ message: 'Error al actualizar el cliente' })
  };
}
