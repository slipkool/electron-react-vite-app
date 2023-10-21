import sql from 'mssql';
import 'dotenv/config';

const DEFAULT_CONFIG = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  },
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

export const connection = new sql.ConnectionPool(connectionString)
  .connect()
  .then((pool) => {
    console.log('Connected to SQLServer...');
    return pool
  })
  .catch((err) => console.log('Database Connection Failed! Bad Config: ', err))
