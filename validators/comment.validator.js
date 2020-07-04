const Joi = require('joi');

module.exports = Joi.object().keys({
    commentText: Joi.string().min(1),
    user_id: Joi.number().integer().min(1),
    doctor_id: Joi.number().integer().min(1)
});