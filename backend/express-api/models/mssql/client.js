import { connection } from './config/database.js'

export class ClientModel {
  static async getAll () {
    const pool = await connection
    const rs = await pool
      .request()
      .query('SELECT cliente_id as id, nombre, tipo_documento, identificacion, direccion, telefono, correo FROM clientes')

    return rs.recordset
  }

  static async getById ({ id }) {
    const pool = await connection
    const rs = await pool
      .request()
      .input('id', id)
      .query('SELECT cliente_id as id, nombre, tipo_documento, identificacion, direccion, telefono, correo FROM clientes WHERE cliente_id = @id ')

    if (rs.recordset.length === 0) return null

    return rs.recordset[0]
  }

  static async create ({ input }) {
    const {
      name,
      address,
      phone,
      documentType,
      identification,
      email
    } = input

    const pool = await connection
    const rs = await pool
      .request()
      .input('name', name)
      .input('address', address)
      .input('phone', phone)
      .input('documentType', documentType)
      .input('identification', identification)
      .input('email', email)
      .output('id')
      .query(`INSERT INTO clientes (nombre, tipo_documento, identificacion, direccion, telefono, correo) 
        VALUES (@name, @documentType, @identification, @address, @phone, @email);
        SELECT @id = SCOPE_IDENTITY();`)

    if (rs.output.id) {
      const client = await this.getById({ id: rs.output.id })
      return client
    }
    return null
  }

  static async delete ({ id }) {
    const client = await this.getById({ id })
    if (client) {
      const pool = await connection
      const rs = await pool
        .request()
        .input('id', id)
        .query('DELETE FROM clientes WHERE cliente_id = @id')

      return rs.rowsAffected[0] > 0
    }

    return false
  }

  static async update ({ id, input }) {
    const client = await this.getById({ id })
    if (!client) {
      return null
    }

    const updateClient = {
      ...client,
      ...input
    }

    const pool = await connection
    const rs = await pool
      .request()
      .input('id', id)
      .input('name', updateClient.name)
      .input('address', updateClient.address)
      .input('phone', updateClient.phone)
      .input('documentType', updateClient.documentType)
      .input('identification', updateClient.identification)
      .input('email', updateClient.email)
      .query(`UPDATE clientes
      SET nombre = @name, tipo_documento = @documentType, identificacion = @identification, direccion = @address, telefono = @phone, correo = @email
      WHERE cliente_id = @id`)

    if (rs.rowsAffected[0] > 0) {
      return await this.getById({ id })
    }

    return null
  }
}
