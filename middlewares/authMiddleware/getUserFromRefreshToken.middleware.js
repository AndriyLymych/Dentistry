const {authService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    const token = req.get('Authorization');

    const userFromToken = await authService.getUserFromTokensByParams({refresh_token: token});

    if (!userFromToken) {
        return next(new CustomError(
            ResponseStatusCodes.BAD_REQUEST,
            CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
            CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
        ));
    }

    req.user = userFromToken;

    next()
}