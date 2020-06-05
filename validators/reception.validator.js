const Joi = require('joi');

module.exports = Joi.object().keys({
    phone_number: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    date: Joi.date(),
    name: Joi.string().min(2).max(40).required(),
    service_id: Joi.number().integer().required(),
    count_mail: Joi.number().integer()

});