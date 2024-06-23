const fileService = require('../services/fileService');
const userService = require('../services/userService');
const { sendSuccessResponse } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const ClientErrorException = require('../exceptions/ClientErrorException');

const uploadAvatar = async (req, res, next) => {
    try {

      if (!req.file) {
        throw new ClientErrorException('The file field is required');
      }

      const result = await fileService.uploadFile(req.file.buffer, 'avatars');
      
      await userService.updateUser(req.userData.userId,{avatar:result.url,avatar_id:result.public_id})

      return sendSuccessResponse(res, result, 'Avatar uploaded successfully');
    
    } catch (error) {
      return next(error);
    }
  };

  const uploadMultipleAvatars = async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        throw new ClientErrorException('The files field is required');
      }
  
      const uploadResults = await Promise.all(req.files.map(file => fileService.uploadFile(file.buffer, 'avatars')));
  
      return sendSuccessResponse(res, uploadResults, 'Avatars uploaded successfully');
    } catch (error) {
      return next(error);
    }
  };  

  module.exports = {
    uploadAvatar,
    uploadMultipleAvatars
  }