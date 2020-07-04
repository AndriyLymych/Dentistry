const Joi = require('joi');

const {noCopyRegex} = require('../constant');

module.exports = Joi.object().keys({
    password: Joi.string().regex(noCopyRegex),
    newPassword: Joi.string().regex(noCopyRegex).required(),
    newPasswordAgain: Joi.string().regex(noCopyRegex).required()
});