const {authService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes, USER_ROLE} = require('../../constant');

module.exports = async (req, res, next) => {
    const access_token = req.get('Authorization');

    const adminFromToken = await authService.getAdminFromAccessToken({access_token});

    if (!adminFromToken) {
        return next(new CustomError(
            ResponseStatusCodes.BAD_REQUEST,
            CustomErrorData.BAD_REQUEST_ADMIN_NOT_PRESENT.message,
            CustomErrorData.BAD_REQUEST_ADMIN_NOT_PRESENT.code,
        ));
    }
    if (adminFromToken.User.role_id !== USER_ROLE.ADMIN) {
        return next(new CustomError(
            ResponseStatusCodes.BAD_REQUEST,
            CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_ADMIN.message,
            CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_ADMIN.code,
        ));
    }
    req.user = adminFromToken;

    next()
}