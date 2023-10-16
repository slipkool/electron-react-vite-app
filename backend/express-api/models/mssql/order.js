import { connection } from './config/database.js'
import sql from 'mssql'

export class OrderModel {
  static async getAll () {
    const pool = await connection
    const rs = await pool.request()
      .query(`SELECT orden_id as id, cliente_id, fecha_creacion, paciente, pagado, fecha_baja, total, abono, imagenes, fecha_actualizacion
      FROM ordenes`)

    return rs.recordset
  }

  static async getById ({ id }) {
    const pool = await connection
    const rs = await pool.request().input('id', id)
      .query(`SELECT orden_id as id, cliente_id, fecha_creacion, paciente, pagado, fecha_baja, total, abono, imagenes, fecha_actualizacion
      FROM ordenes WHERE orden_id = @id`)

    if (rs.recordset.length === 0) return null

    return rs.recordset[0]
  }

  static async create ({ input }) {
    try {
      const { clientId, patient, paid, total, partialPayment, images, productsIds } = input

      const pool = await connection
      const rs = await pool
        .request()
        .input('clientId', clientId)
        .input('patient', patient)
        .input('paid', paid)
        .input('total', total)
        .input('partialPayment', partialPayment)
        .input('images', images)
        .output('id')
        .query(`INSERT INTO ordenes (cliente_id, fecha_creacion, paciente, pagado, total, abono, imagenes, fecha_actualizacion)
          VALUES (@clientId, GETDATE(), @patient, @paid, @total, @partialPayment, @images, GETDATE());
          SELECT @id = SCOPE_IDENTITY();`)

      if (rs.output.id) {
        const table = new sql.Table('ordenes_pruebas')
        table.create = false
        table.columns.add('orden_id', sql.Int, { nullable: false, primary: true })
        table.columns.add('prueba_id', sql.Int, { nullable: false, primary: true })
        for (const productId of productsIds) {
          table.rows.add(rs.output.id, productId)
        }
        const results = await pool.request().bulk(table)

        if (results.rowsAffected > 0) {
          const order = await this.getById({ id: rs.output.id })
          return order
        }
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
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
      .input('price', updateTestLab.price).query(`UPDATE pruebas_laboratorio
      SET nombre = @name, precio = @price
      WHERE prueba_id = @id`)

    if (rs.rowsAffected[0] > 0) {
      return await this.getById({ id })
    }

    return null
  }
}
