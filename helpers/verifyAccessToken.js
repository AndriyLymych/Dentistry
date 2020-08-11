const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const {JWT_SECRET_ACCESS} = require('../config/configs');
const {ResponseStatusCodes} = require('../constant');
const {CustomError, CustomErrorData} = require('../error');

const verify = promisify(jwt.verify);

module.exports = async (token) => {

    try {
        await verify(token, JWT_SECRET_ACCESS)
    } catch {
        throw  new CustomError(
            ResponseStatusCodes.UNAUTHORIZED,
            CustomErrorData.UNAUTHORIZED_BAD_ACCESS_TOKEN.message,
            CustomErrorData.UNAUTHORIZED_BAD_ACCESS_TOKEN.code,
        )

    }
};