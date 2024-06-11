const fileService = require('../services/fileService');
const fs = require('fs');
const { sendSuccessResponse } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const ClientErrorException = require('../exceptions/ClientErrorException');

const uploadAvatar = async (req, res,next) => {
  
    try {

        const result = await fileService.uploadFile(req.file.path,'avatars');

        return sendSuccessResponse(res, result, "Avatar uploaded successfully");

    } catch (error) {
        logger.error(error)
        return next(error);
    }

  };

  module.exports = {
    uploadAvatar
  }