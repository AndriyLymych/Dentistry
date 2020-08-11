const Joi = require('joi');

const {noCopyRegex} = require('../constant');

module.exports = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(noCopyRegex).required(),
    name: Joi.string().min(2).max(40).required(),
    middleName: Joi.string().min(2).max(40).required(),
    surname: Joi.string().min(2).max(40).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    city: Joi.string().required(),
    avatar: Joi.string(),
    created_at: Joi.date(),
    role_id: Joi.number().integer().min(1).max(3).required(),
    speciality_id: Joi.number().integer().min(1).max(4),
    status_id: Joi.number().integer().min(1).max(2),
    gender_id: Joi.number().integer().min(1).max(2),
    experience: Joi.number().integer().min(1),
    room: Joi.number().integer().min(1),
});