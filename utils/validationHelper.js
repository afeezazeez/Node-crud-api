const Validator = require('fastest-validator');

const v = new Validator();

function validate(data, schema) {
    const validatorResponse = v.validate(data, schema);
    if (validatorResponse !== true) {
        return { isValid: false, errors: validatorResponse };
    }
    return { isValid: true };
}

module.exports = {
    validate
};
