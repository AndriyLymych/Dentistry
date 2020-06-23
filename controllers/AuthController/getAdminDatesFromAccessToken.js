const {userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const {user_id: id} = req.user;

        const user = await userService.getUserInfoFromAccessToken(id);

        if (!user) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
            )
        }

        res.json(user);

    } catch (e) {

        next(new CustomError(e.status, e.message, e.code))

    }
}