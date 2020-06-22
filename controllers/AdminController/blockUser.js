const {oauthService, adminService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes, USER_STATUS} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const {id, status_id} = req.user;

        if (status_id === USER_STATUS.BLOCKED) {

            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_BLOCK_USER.message,
                CustomErrorData.BAD_REQUEST_BLOCK_USER.code,
            )
        }

        await adminService.blockUser(id);

        await oauthService.deleteTokensFromDB({user_id: id});

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        next(new CustomError(e))

    }

}