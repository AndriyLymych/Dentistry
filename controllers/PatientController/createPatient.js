const Joi = require('joi');

const {USER_ROLE, USER_STATUS, ResponseStatusCodes} = require('../../constant');
const {userService, emailService} = require('../../services');
const {passwordHasher} = require('../../helpers');
const {userValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const patient = req.body;

        patient.role_id = USER_ROLE.PATIENT;
        patient.status_id = USER_STATUS.ACTIVE;


        const validatedPatient = Joi.validate(patient, userValidator);

        if (validatedPatient.error) {
            throw new CustomError(validatedPatient.error.details[0].message, 400, 'Create Patient');
        }

        patient.password = await passwordHasher(patient.password);

        const {id} = await userService.createUser(patient);



        // await emailService.sendEmailForRegister(patient.email,patient.name,patient.middleName);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
};