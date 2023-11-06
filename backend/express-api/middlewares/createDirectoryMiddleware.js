import fs from 'fs';
import { rimraf } from 'rimraf';
import { FILE_UPLOAD_FOLDER } from '../models/mssql/config/constants.js';

export const createDirectoryMiddleware = (req, res, next) => {
  const { id } = req.params
  const dir = FILE_UPLOAD_FOLDER + id;
  if (fs.existsSync(dir)) {
    rimraf.sync(dir);
  }
  fs.mkdirSync(dir, { recursive: true })

  next();
}
