const Joi = require('joi');

const {userService, oauthService} = require('../../services');
const {USER_STATUS, USER_ROLE, ResponseStatusCodes} = require('../../constant');
const {tokenCreator, passwordChecker} = require('../../helpers');
const {CustomError, CustomErrorData} = require('../../error');
const {authValidator} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const userPresent = await userService.getUserByParams({
            email
        });
        if (!userPresent) {

            throw  new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
            )
        }
        if (userPresent.role_id !== USER_ROLE.PATIENT && userPresent.role_id !== USER_ROLE.DOCTOR) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
            )
        }



        if (userPresent.status_id === USER_STATUS.BLOCKED) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_USER_IS_BLOCKED.message,
                CustomErrorData.FORBIDDEN_USER_IS_BLOCKED.code,
            )
        }

        const validatedAuth = Joi.validate({email, password}, authValidator);

        if (validatedAuth.error) {

            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN, validatedAuth.error.details[0].message
            );
        }
        await passwordChecker(userPresent.password, password);

        const tokens = tokenCreator();

        await oauthService.insertTokens({
            user_id: userPresent.id,
            ...tokens
        });

        res.json(tokens);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}