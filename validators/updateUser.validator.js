const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().min(2).max(40).required(),
    middleName: Joi.string().min(2).max(40).required(),
    surname: Joi.string().min(2).max(40).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    city: Joi.string().required(),
    avatar: Joi.string()
});