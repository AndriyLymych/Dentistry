const Joi = require('joi');

const {USER_ROLE, USER_STATUS, ResponseStatusCodes} = require('../../constant');
const {userService, emailService} = require('../../services');
const {passwordHasher} = require('../../helpers');
const {userValidator} = require('../../validators');
const {CustomError, CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {

        const doctor = req.body;
        const {email} = doctor;
        const isEmailPresent = await userService.getUserByParams({email});

        if (isEmailPresent) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_ALREADY_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_ALREADY_PRESENT.code,
            )
        }

        doctor.role_id = USER_ROLE.DOCTOR;
        doctor.status_id = USER_STATUS.ACTIVE;

        const validatedDoctor = Joi.validate(doctor, userValidator);

        if (validatedDoctor.error) {
            throw new CustomError(validatedDoctor.error.details[0].message, 400, 'Create Patient');
        }

        doctor.password = await passwordHasher(doctor.password);

        await userService.createUser(doctor);

        await emailService.sendEmailForRegister(doctor.email, doctor.name, doctor.middleName);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e))
    }
};
