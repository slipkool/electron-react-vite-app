import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { FILE_UPLOAD_FOLDER } from "../models/mssql/config/constants.js";

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params
    const dir = FILE_UPLOAD_FOLDER + id
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

function fileType(file, cb) {
  const filetypes = /png|jpg|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error("Por favor, cargar solo imagenes .png, .jpg, y .jpeg"));
  }
}

// Create multer upload instance
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    fileType(file, cb)
  }
})

// Custom file upload middleware
export const uploadMiddleware = (req, res, next) => {
  // Use multer upload instance
  upload.array('files', 2)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message })
    }

    // Retrieve uploaded files
    const files = req.files
    const errors = []

    if (!files || files.length === 0) {
      next()
    }

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/octet-stream'];
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Tipo de archivo invalido: ${file.originalname}`)
      }

      if (file.size > maxSize) {
        errors.push(`Archivo demasiado pesado: ${file.originalname}`)
      }
    })

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path)
      });

      return res.status(400).json({ message: errors })
    }

    // Attach files to the request object
    req.files = files

    // Proceed to the next middleware or route handler
    next()
  });
}
