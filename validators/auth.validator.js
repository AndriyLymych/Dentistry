const Joi = require('joi');

const {noCopyRegex} = require('../constant');

module.exports = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(noCopyRegex).required()
});