const Joi = require('joi');

const {USER_ROLE, USER_STATUS, ResponseStatusCodes} = require('../../constant');
const {userService, emailService} = require('../../services');
const {passwordHasher} = require('../../helpers');
const {userValidator} = require('../../validators');
const {CustomError, CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const patient = req.body;
        const {email} = patient;

        const isPatientEmailPresent = await userService.getUserByParams({email});

        if (isPatientEmailPresent) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_ALREADY_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_ALREADY_PRESENT.code,
            )
        }

        patient.role_id = USER_ROLE.PATIENT;
        patient.status_id = USER_STATUS.ACTIVE;

        const validatedPatient = Joi.validate(patient, userValidator);

        if (validatedPatient.error) {
            throw new CustomError(ResponseStatusCodes.FORBIDDEN, validatedPatient.error.details[0].message);
        }

        patient.password = await passwordHasher(patient.password);

        await userService.createUser(patient);

        await emailService.sendEmailForRegister(patient.email, patient.name, patient.middleName);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};