const multer = require('multer');
const  ValidationException  = require('../exceptions/ValidationException');

// Dynamic Multer configuration based on route-specific options
const createMulterUpload = (options) => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (!options.allowedMimeTypes.includes(file.mimetype)) {
      return cb(new ValidationException([{message:'Invalid file type'}]), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    limits: { fileSize: options.maxSize },
    fileFilter
  });
};

module.exports = { createMulterUpload };
