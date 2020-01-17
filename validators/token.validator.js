const Joi = require('joi');

module.exports  = Joi.object().keys({
    access_token: [Joi.string(), Joi.number()],
    refresh_token:[Joi.string(), Joi.number()]
})