const {verifyAccessToken} = require('../../helpers');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {

    try {
        const token = req.get('Authorization');

        if (!token) {
            return next(new CustomError(
                ResponseStatusCodes.UNAUTHORIZED,
                CustomErrorData.UNAUTHORIZED_USER.message,
                CustomErrorData.UNAUTHORIZED_USER.code,
            ));
        }

        await verifyAccessToken(token);

        next()

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }

};