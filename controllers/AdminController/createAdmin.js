const Joi = require('joi');

const {USER_ROLE, USER_STATUS, ResponseStatusCodes} = require('../../constant');
const {userService, emailService} = require('../../services');
const {passwordHasher} = require('../../helpers');
const {userValidator} = require('../../validators');
const {CustomError,CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const admin = req.body;
        const {email} = admin;

        admin.role_id = USER_ROLE.ADMIN;
        admin.status_id = USER_STATUS.ACTIVE;

        const isEmailPresent = await userService.getUserByParams({email});

        if (isEmailPresent) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_ALREADY_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_ALREADY_PRESENT.code,
            )
        }

        const validatedAdmin = Joi.validate(admin, userValidator);

        if (validatedAdmin.error) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST, validatedAdmin.error.details[0].message
            );
        }

        admin.password = await passwordHasher(admin.password);

        await userService.createUser(admin);

        // await emailService.sendEmailForRegister(admin.email, admin.name, admin.middleName);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};