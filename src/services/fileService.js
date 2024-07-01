const cloudinary = require('../config/cloudinary');
const ClientErrorException = require('../exceptions/ClientErrorException');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');
const environment = process.env.NODE_ENV

const uploadFile = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: `${environment}/${folder}`,
      },
      (error, result) => {
        if (error) {
          logger.error(`[FileService] : Failed to upload file with error ${error.message}`, { stack: error.stack });
          return reject(new ClientErrorException('Failed to upload file'));
        }
        const response = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        resolve(response);
      }
    );

    uploadStream.end(buffer);
  });
};



module.exports = {
  uploadFile
};
