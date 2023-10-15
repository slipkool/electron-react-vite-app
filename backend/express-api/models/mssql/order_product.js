import { connection } from './config/database.js'

export class OrderProductModel {
  static async getProductsByOrderId ({ id }) {
    const pool = await connection
    const rs = await pool
      .request()
      .input('id', id)
      .query(`SELECT pl.prueba_id AS id, pl.nombre, pl.precio
      FROM  ordenes_pruebas op
      INNER JOIN pruebas_laboratorio pl on op.prueba_id = pl.prueba_id
      WHERE op.orden_id = @id `)

    if (rs.recordset.length === 0) return null

    return rs.recordset
  }
}
