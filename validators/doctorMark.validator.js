const Joi = require('joi');

module.exports = Joi.object().keys({
    mark: Joi.number().integer().min(1).max(5).required(),
    user_id: Joi.number().integer().required(),
    doctor_id: Joi.number().integer().required(),
    isEvaluated: Joi.boolean()
});