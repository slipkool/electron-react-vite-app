import { connection } from './config/database.js';
import sql from 'mssql';

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
      const {
        clientId,
        patient,
        paid,
        total,
        partialPayment,
        images,
        productsIds
      } = input

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
        const table = new sql.Table('ordenes_pruebas');
        table.create = false
        table.columns.add('orden_id', sql.Int, {
          nullable: false,
          primary: true
        });
        table.columns.add('prueba_id', sql.Int, {
          nullable: false,
          primary: true
        });
        for (const productId of productsIds) {
          table.rows.add(rs.output.id, productId)
        }
        const results = await pool.request().bulk(table)

        if (results.rowsAffected > 0) {
          const order = await this.getById({ id: rs.output.id })
          return order
        }
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  static async delete ({ id }) {
    try {
      const order = await this.getById({ id })
      if (order) {
        const pool = await connection
        let rs = await pool
          .request()
          .input('id', id)
          .query('DELETE FROM ordenes_pruebas WHERE orden_id = @id');

        if (rs.rowsAffected[0] > 0) {
          rs = await pool
            .request()
            .input('id', id)
            .query('DELETE FROM ordenes WHERE orden_id = @id');
          return rs.rowsAffected[0] > 0
        }
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }

  static async update ({ id, input }) {
    try {
      const order = await this.getById({ id });
      if (!order) {
        return null;
      }

      const pool = await connection;
      const rs = await pool
        .request()
        .input("id", id)
        .input("clientId", input.clientId)
        .input("patient", input.patient)
        .input("paid", input.paid)
        .input('total', input.total)
        .input("partialPayment", input.partialPayment).query(`UPDATE ordenes
      SET cliente_id = @clientId, paciente = @patient, pagado = @paid, total = @total, abono = @partialPayment, fecha_actualizacion = GETDATE()
      WHERE orden_id = @id`)

      if (rs.rowsAffected[0] > 0) {
        const rs = await pool
          .request()
          .input("id", id)
          .query('DELETE FROM ordenes_pruebas WHERE orden_id = @id');

        if (rs.rowsAffected[0] > 0) {
          const table = new sql.Table("ordenes_pruebas");
          table.create = false;
          table.columns.add("orden_id", sql.Int, {
            nullable: false,
            primary: true,
          })
          table.columns.add('prueba_id', sql.Int, {
            nullable: false,
            primary: true,
          })
          for (const productId of input.productsIds) {
            table.rows.add(id, productId)
          }
          const results = await pool.request().bulk(table);

          if (results.rowsAffected > 0) {
            const order = await this.getById({ id });
            return order;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    return null
  }

  static async updateImage ({ id, input }) {
    try {
      const order = await this.getById({ id });
      if (!order) {
        return null;
      }

      const pool = await connection;
      const rs = await pool
        .request()
        .input("id", id)
        .input(
          "images",
          input
            .map((item) => {
              return item.path
            })
            .join(', '),
        ).query(`UPDATE ordenes
      SET imagenes = @images, fecha_actualizacion = GETDATE()
      WHERE orden_id = @id`)

      if (rs.rowsAffected[0] > 0) {
        const order = await this.getById({ id });
        return order;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
