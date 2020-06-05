const Joi = require('joi');

const {userService, authService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');
const {changePasswordValidator} = require('../../validators');
const {passwordHasher} = require('../../helpers');

module.exports = async (req, res) => {
    try {
        const {token:action_token} = req.params;
        console.log(action_token);
        const password = req.body;
        if (!action_token) {
            throw new CustomError('Token is not present', ResponseStatusCodes.FORBIDDEN, 'resetPassword');
        }

        const tokenFromDB = await authService.getUserAndTokenForResetPassword({action_token});

        if (!tokenFromDB) {
            throw new CustomError('Wrong token', ResponseStatusCodes.FORBIDDEN, 'resetPassword');

        }

        if (password.newPassword !== password.newPasswordAgain) {
            throw new CustomError('Passwords do not match', ResponseStatusCodes.FORBIDDEN, 'changePassword')
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
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
}