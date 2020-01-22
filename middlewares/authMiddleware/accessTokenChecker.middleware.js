const {verifyAccessToken} = require('../../helpers');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {

    const token = req.get('Authorization');

    if (!token) {
        return next(new CustomError('User is not authorized', ResponseStatusCodes.UNAUTHORIZED, 'AccessTokenChecker.middleware'));
    }

    verifyAccessToken(token);

    next()

};