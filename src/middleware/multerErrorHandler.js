const ValidationException = require('../exceptions/ValidationException');
const multer = require('multer');

const multerErrorHandler = (err, req, res, next) => {
 
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      const maxSizeInMB = req.maxSize / (1024 * 1024);
      const maxSizeMessage = `File cannot exceed ${maxSizeInMB} MB`;
      return next(new ValidationException([{ message: maxSizeMessage }]));
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      
      return next(new ValidationException([{ message: "Max number of file exceeded" }]));
    }
  }

 
  next(err);
};

module.exports = multerErrorHandler;
