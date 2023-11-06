import multer from "multer";
import fs from "fs";
import path from "path";

const FILE_UPLOAD_FOLDER = "./uploads/";

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    fs.mkdir(FILE_UPLOAD_FOLDER + id, (err) => {
      cb(null, FILE_UPLOAD_FOLDER + id);
    })
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Create multer upload instance
const upload = multer({ storage });

// Custom file upload middleware
export const uploadMiddleware = (req, res, next) => {
  // Use multer upload instance
  upload.array("files", 2)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    if (!files || files.length === 0) {
      next();
    }

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      })

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  })
}

export const getUploadImage = (req, res) => {
  const { action } = req.query;
  const filePath = path.resolve(
    __dirname,
    FILE_UPLOAD_FOLDER,
    "40004/1699223961695-1A725RP.jpg",
  );

  if (action === "view") {
    return res.sendFile(filePath);
  } else {
    return res.download(filePath);
  }
};
