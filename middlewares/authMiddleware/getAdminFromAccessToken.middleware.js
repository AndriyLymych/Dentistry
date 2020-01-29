const {authService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes, USER_ROLE} = require('../../constant');

module.exports = async (req, res, next) => {
    const access_token = req.get('Authorization');

    const adminFromToken = await authService.getAdminFromAccessToken({access_token});

    if (!adminFromToken) {
        return next(
            new CustomError('Admin is not present', ResponseStatusCodes.NOT_FOUND, 'getAdminFromAccessToken.middleware')
        )
    }
    if (adminFromToken.User.role_id !== USER_ROLE.ADMIN) {
        return next(
            new CustomError('You are not admin', ResponseStatusCodes.NOT_FOUND, 'getAdminFromAccessToken.middleware')
        )
    }
    req.user = adminFromToken;

    next()
}