const Joi = require('joi');

const {userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');
const {passwordHasher, passwordChecker} = require('../../helpers');
const {changePasswordValidator} = require('../../validators');

module.exports = async (req, res, next) => {
    try {

        const {password, newPassword, newPasswordAgain} = req.body;
        const {user_id: id} = req.user;

        const user = await userService.getUserById(id);

        await passwordChecker(user.password, password);

        const validatedPasswordData = Joi.validate({password, newPassword, newPasswordAgain}, changePasswordValidator);

        if (validatedPasswordData.error) {

            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN, validatedPasswordData.error.details[0].message
            );
        }


        if (newPassword !== newPasswordAgain) {

            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_PASSWORDS_NOT_MATCH.message,
                CustomErrorData.FORBIDDEN_PASSWORDS_NOT_MATCH.code,
            )
        }

        const hashPass = await passwordHasher(newPassword);

        await userService.updateUserByParams({password: hashPass}, id);

        res.status(ResponseStatusCodes.CREATED).end()
    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}