const cloudinary = require('../config/cloudinary');
const ClientErrorException = require('../exceptions/ClientErrorException');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');

const uploadFile = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder
    });
    clearUploadsDirectory();
    return result.secure_url;
  } catch (error) {
      logger.error(`[FileService] : Failed to upload file with error  ${error.message}`)
      throw new ClientErrorException(`Failed to upload file`);
  }
};

const clearUploadsDirectory = () => {
  const directory = path.join(__dirname, '../uploads'); 
  console.log(directory)
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
};


module.exports = {
  uploadFile
};
