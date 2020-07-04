const Joi = require('joi');

const {ResponseStatusCodes} = require('../../constant');
const {receptionValidator} = require('../../validators');
const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res, next) => {
    try {
        const reception = req.body;
        reception.count_mail = 0;

        const validatedReception = Joi.validate(reception, receptionValidator);

        if (validatedReception.error) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN, validatedReception.error.details[0].message
            );
        }

        await userService.receptionPatient(reception);

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}