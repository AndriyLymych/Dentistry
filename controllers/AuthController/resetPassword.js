const Joi = require('joi');

const {userService, authService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');
const {changePasswordValidator} = require('../../validators');
const {passwordHasher} = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const {token: action_token} = req.params;
        const password = req.body;

        if (!action_token) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_NO_TOKEN.message,
                CustomErrorData.BAD_REQUEST_NO_TOKEN.code,
            )
        }

        const tokenFromDB = await authService.getUserAndTokenForResetPassword({action_token});

        if (!tokenFromDB) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_WRONG_ACTION_TOKEN.message,
                CustomErrorData.FORBIDDEN_WRONG_ACTION_TOKEN.code,
            )
        }

        if (password.newPassword !== password.newPasswordAgain) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_PASSWORDS_NOT_MATCH.message,
                CustomErrorData.FORBIDDEN_PASSWORDS_NOT_MATCH.code,
            )
        }

        const validatedPassword = Joi.validate(password, changePasswordValidator);

        if (validatedPassword.error) {
            throw new CustomError(validatedPassword.error.details[0].message, 400, 'resetPassword');
        }

        password.newPassword = await passwordHasher(password.newPassword);

        await userService.updateUserByParams({password: password.newPassword}, tokenFromDB.user_id);

        await authService.deleteTokenForResetPassword(tokenFromDB.user_id);

        res.status(ResponseStatusCodes.CREATED).end()
    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}