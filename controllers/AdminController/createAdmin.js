const Joi = require('joi');

const {USER_ROLE, USER_STATUS, ResponseStatusCodes} = require('../../constant');
const {userService, emailService} = require('../../services');
const {passwordHasher} = require('../../helpers');
const {userValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const admin = req.body;

        admin.role_id = USER_ROLE.ADMIN;
        admin.status_id = USER_STATUS.ACTIVE;

        const validatedAdmin = Joi.validate(admin, userValidator);

        if (validatedAdmin.error) {
            throw new CustomError(validatedAdmin.error.details[0].message, ResponseStatusCodes.BAD_REQUEST, 'Create Patient');
        }

        admin.password = await passwordHasher(admin.password);

        await userService.createUser(admin);

        await emailService.sendEmailForRegister(admin.email,admin.name,admin.middleName);

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