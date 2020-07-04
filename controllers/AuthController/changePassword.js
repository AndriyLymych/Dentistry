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

        const userPresent = await userService.getUserByParams(
            {password}
        );

        if (!userPresent){
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_WRONG_EMAIL.message,
                CustomErrorData.BAD_REQUEST_WRONG_EMAIL.code,
            )
        }

        const validatedPasswordData = Joi.validate({password, newPassword, newPasswordAgain}, changePasswordValidator);

        if (validatedPasswordData.error) {

            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN, validatedPasswordData.error.details[0].message
            );
        }
        const user = await userService.getUserById(id);

        await passwordChecker(user.password, password);

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