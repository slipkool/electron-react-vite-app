import fs from 'fs';
import { FILE_UPLOAD_FOLDER } from '../models/mssql/config/constants.js';

export const createDirectoryMiddleware = (req, res, next) => {
  const { id } = req.params
  const dir = FILE_UPLOAD_FOLDER + id;
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true })

  next();
}
