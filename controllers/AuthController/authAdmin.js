const {userService, oauthService} = require('../../services');
const {USER_STATUS, USER_ROLE, ResponseStatusCodes} = require('../../constant');
const {tokenCreator, passwordChecker} = require('../../helpers');
const {CustomError,CustomErrorData} = require('../../error');

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
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
            )
        }
        if (adminPresent.status_id === USER_STATUS.BLOCKED) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_USER_IS_BLOCKED.message,
                CustomErrorData.FORBIDDEN_USER_IS_BLOCKED.code,
            )
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