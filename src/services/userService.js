const models = require('../models');
const ClientErrorException = require('../exceptions/ClientErrorException');

async function updateUser(id, updatedData) {
  
    const user = await models.User.findOne({ where: { id: id} });
    
    if (!user) {
        throw new ClientErrorException("User not found", 404);
    }
    
    await user.update(updatedData);

    return user;
}

module.exports = {
    updateUser
};
