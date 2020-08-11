const {oauthService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');
const {CustomError,CustomErrorData} = require('../../error');

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
        await oauthService.deleteTokensFromDB({access_token: token});

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};