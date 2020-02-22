const Joi = require('joi');

const {noCopyRegex} = require('../constant');

module.exports = Joi.object().keys({
    newPassword: Joi.string().regex(noCopyRegex).required(),
    newPasswordAgain: Joi.string().regex(noCopyRegex).required()
})