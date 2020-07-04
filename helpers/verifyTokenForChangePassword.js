const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const {JWT_SECRET_CHANGE_PASSWORD} = require('../config/configs');
const {ResponseStatusCodes} = require('../constant');
const {CustomError, CustomErrorData} = require('../error');

const verify = promisify(jwt.verify);

module.exports = async action_token => {
    try {
        await verify(action_token, JWT_SECRET_CHANGE_PASSWORD)
    } catch {
        throw new CustomError(
            ResponseStatusCodes.UNAUTHORIZED,
            CustomErrorData.UNAUTHORIZED_BAD_TOKEN.message,
            CustomErrorData.UNAUTHORIZED_BAD_TOKEN.code,
        )
    }
};