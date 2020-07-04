const Joi = require('joi');

const {userService, oauthService} = require('../../services');
const {USER_STATUS, USER_ROLE, ResponseStatusCodes} = require('../../constant');
const {tokenCreator, passwordChecker} = require('../../helpers');
const {CustomError,CustomErrorData} = require('../../error');
const {authValidator} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const adminPresent = await userService.getUserByParams({
            email,
            role_id: USER_ROLE.ADMIN
        });

        if (!adminPresent) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_ADMIN_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_ADMIN_NOT_PRESENT.code,
            )
        }
        if (adminPresent.status_id === USER_STATUS.BLOCKED) {
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
        await passwordChecker(adminPresent.password, password);

        const tokens = tokenCreator();

        await oauthService.insertTokens({
            user_id: adminPresent.id,
            ...tokens
        });

        res.json(tokens)
    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}