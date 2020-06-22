const {userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    const {id} = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
        return next(new CustomError(
            ResponseStatusCodes.BAD_REQUEST,
            CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
            CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
        ));
    }

    req.user = user;

    next()
}