const {verifyRefreshToken} = require('../../helpers');
const {CustomError,CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {

    const token = req.get('Authorization');

    if (!token) {
        return next(new CustomError(
            ResponseStatusCodes.UNAUTHORIZED,
            CustomErrorData.UNAUTHORIZED_USER.message,
            CustomErrorData.UNAUTHORIZED_USER.code,
        ));
    }

    verifyRefreshToken(token);

    next()

}