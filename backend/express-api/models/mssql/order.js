import { connection } from './config/database.js'

export class OrderModel {
  static async getAll () {
    const pool = await connection
    const rs = await pool
      .request()
      .query(`SELECT orden_id as id, cliente_id, fecha_creacion, paciente, pagado, fecha_baja, total, abono, imagenes, fecha_actualizacion
      FROM ordenes`)

    return rs.recordset
  }

  static async getById ({ id }) {
    const pool = await connection
    const rs = await pool
      .request()
      .input('id', id)
      .query('SELECT prueba_id as id, nombre, precio FROM pruebas_laboratorio WHERE prueba_id = @id ')

    if (rs.recordset.length === 0) return null

    return rs.recordset[0]
  }

  static async create ({ input }) {
    const {
      name,
      price
    } = input

    const pool = await connection
    const rs = await pool
      .request()
      .input('name', name)
      .input('price', price)
      .output('id')
      .query(`INSERT INTO pruebas_laboratorio (nombre, precio) 
        VALUES (@name, @price);
        SELECT @id = SCOPE_IDENTITY();`)

    if (rs.output.id) {
      const testLab = await this.getById({ id: rs.output.id })
      return testLab
    }
    return null
  }

  static async delete ({ id }) {
    const testLab = await this.getById({ id })
    if (testLab) {
      const pool = await connection
      const rs = await pool
        .request()
        .input('id', id)
        .query('DELETE FROM pruebas_laboratorio WHERE prueba_id = @id')

      return rs.rowsAffected[0] > 0
    }

    return false
  }

  static async update ({ id, input }) {
    const testLab = await this.getById({ id })
    if (!testLab) {
      return null
    }

    const updateTestLab = {
      ...testLab,
      ...input
    }

    const pool = await connection
    const rs = await pool
      .request()
      .input('id', id)
      .input('name', updateTestLab.name)
      .input('price', updateTestLab.price)
      .query(`UPDATE pruebas_laboratorio
      SET nombre = @name, precio = @price
      WHERE prueba_id = @id`)

    if (rs.rowsAffected[0] > 0) {
      return await this.getById({ id })
    }

    return null
  }
}
