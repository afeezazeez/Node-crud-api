const bcrypt = require('bcryptjs');

function hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
}

function check(plainPassword,hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword);
}



module.exports = {
    hashPassword,
    check
};
